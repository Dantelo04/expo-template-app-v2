import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authClient } from "@/lib/auth-client";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setConversions } from "@/lib/actions/setConversions";

SplashScreen.preventAutoHideAsync();

interface User {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
  currency: string[];
  mainCurrency: string | null;
  categories: string[];
  permissions: string;
  wallets: string[];
}

interface SessionContextType {
  session: any | null;
  user: User | null;
  hasMainCurrency: boolean;
  isLoading: boolean;
  isAppleLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  error: string | null;
  updateUserMainCurrency: (currency: string) => Promise<void>;
  updateUserCurrencies: (currencies: string[]) => Promise<void>;
  updateUserWallets: (wallets: string[]) => Promise<void>;
  updateUserCategories: (categories: string[]) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hasMainCurrency, setHasMainCurrency] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      const currentSession: any = await authClient.getSession();
      if (currentSession?.data) {
        setSession(currentSession.data.session);
        setUser({ ...(currentSession.data.user as User) });
        setHasMainCurrency(currentSession.data.user.mainCurrency || false);
      }
    } catch (err) {
      setError("Failed to initialize session");
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
      await SplashScreen.hideAsync();
    }
  };

  const refreshSession = async () => {
    try {
      setIsLoading(true);

      let attempts = 0;
      let currentSession = null;

      while (attempts < 5) {
        const result: any = await authClient.getSession();
        if (result?.data?.session) {
          currentSession = result;
          break;
        }
        attempts++;
        await new Promise((res) => setTimeout(res, 300));
      }

      if (currentSession?.data) {
        setSession(currentSession.data.session);
        setUser({ ...(currentSession.data.user as User) });
        setHasMainCurrency(currentSession.data.user.mainCurrency || false);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (err) {
      setError("Failed to refresh session");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            router.replace("/(tabs)/home");
          },
          onError: (err) => {
            console.log("sign in error", err);
            setError(err?.error?.message || "Failed to sign in");
          },
        }
      );
    } catch (err) {
      setError("Unexpected error during sign-in");
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${
          process.env.EXPO_PUBLIC_APP_SCHEME || "financetrackerapp"
        }://`,
      });
    } catch (err) {
      setError("Unexpected error during sign-in with Google");
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setIsAppleLoading(true);
      setError(null);
      await authClient.signIn.social({
        provider: "apple",
        callbackURL: `${
          process.env.EXPO_PUBLIC_APP_SCHEME || "financetrackerapp"
        }://`,
      });
    } catch (err) {
      setError("Unexpected error during sign-in with Apple");
    } finally {
      await refreshSession();
      setIsAppleLoading(false);
    }
  };

  const updateUserMainCurrency = async (currency: string) => {
    setIsLoading(true);
    try {
      await authClient.updateUser({
        mainCurrency: currency,
        currency: [...(user?.currency || []), currency],
      });
      const { addCurrency } = await import("@/lib/actions/addCurrency");
      await addCurrency(currency, user?.currency);
      await setConversions(null);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      await refreshSession();
      router.replace("/(tabs)/home");
      setIsLoading(false);
    }
  };

  const updateUserCurrencies = async (currencies: string[]) => {
    setIsLoading(true);
    try {
      await authClient.updateUser({
        currency: currencies,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserCategories = async (categories: string[]) => {
    setIsLoading(true);
    try {
      await authClient.updateUser({ categories });
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  };

  const updateUserWallets = async (wallets: string[]) => {
    setIsLoading(true);
    try {
      await authClient.updateUser({ wallets });
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await authClient.signUp.email(
        { email, password, name: name },
        {
          onSuccess: () => {
            router.replace("/(tabs)/home");
          },
          onError: (err) => {
            setError(err?.error?.message || "Failed to sign up");
          },
        }
      );
    } catch (err) {
      setError("Unexpected error during sign-up");
    } finally {
      await refreshSession();
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: async () => {
            await refreshSession();
            await AsyncStorage.clear();
            router.replace("/");
          },
        },
      });
    } catch (err) {
      setError("Unexpected error during sign-out");
    } finally {
      await AsyncStorage.clear();
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      await authClient.deleteUser();
    } catch (err) {
      setError("Unexpected error during delete account");
    } finally {
      await refreshSession();
      await AsyncStorage.clear();
      router.replace("/");
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value: SessionContextType = {
    session,
    user,
    hasMainCurrency,
    isLoading,
    isAppleLoading,
    isInitialized,
    isAuthenticated: !!session,
    error,
    deleteAccount,
    updateUserMainCurrency,
    updateUserCurrencies,
    updateUserCategories,
    updateUserWallets,
    signIn,
    signInWithGoogle,
    signInWithApple,
    signUp,
    signOut,
    refreshSession,
    clearError,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const useUser = () => useSession().user;

export const useAuth = () => {
  const { isAuthenticated, isLoading } = useSession();
  return { isAuthenticated, isLoading };
};

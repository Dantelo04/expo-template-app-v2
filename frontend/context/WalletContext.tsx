import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type WalletContextType = {
  selectedWallet: string | null;
  setSelectedWallet: (wallet: string | null) => void;
  isShowingAllWallets: boolean;
};

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedWallet, setSelectedWalletState] = useState<string | null>(null);

  const setSelectedWallet = useCallback((wallet: string | null) => {
    setSelectedWalletState(wallet);
  }, []);

  const isShowingAllWallets = selectedWallet === null;

  const value: WalletContextType = {
    selectedWallet,
    setSelectedWallet,
    isShowingAllWallets,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};


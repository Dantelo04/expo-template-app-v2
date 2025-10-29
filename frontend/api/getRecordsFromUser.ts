import { authClient } from "@/lib/auth-client";

export const getRecordsFromUser = async (id: string) => {
  const session = await authClient.getSession();
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BETTER_AUTH_URL}/records/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.session?.token || ""}`,
        },
        credentials: "include",
      }
    );
    
    if (!response.ok) {
      console.log("Error response:", response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.log("Error fetching records:", error);
    return [];
  }
};

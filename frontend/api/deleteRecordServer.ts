import { authClient } from "@/lib/auth-client";

export const deleteRecordServer = async (id: string) => {
  const session = await authClient.getSession();
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BETTER_AUTH_URL}/records/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.session?.token || ""}`,
        },
        credentials: "include",
      }
    );
    return response;
  } catch (error) {
    console.log("Error deleting record:", error);
    return null;
  }
};

export const deleteManyRecordsServer = async (ids: string[]) => {
  const session = await authClient.getSession();

  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BETTER_AUTH_URL}/records/many`,
      {
        method: "DELETE",
        body: JSON.stringify({ ids }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.session?.token || ""}`,
        },
        credentials: "include",
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error("Server error deleting records:", errorData);
      throw new Error(`Server error: ${response}`);
    }
    
    const result = await response.json();
    return response;
  } catch (error) {
    console.error("Error deleting records:", error);
    throw error; // Re-throw to allow proper error handling upstream
  }
};

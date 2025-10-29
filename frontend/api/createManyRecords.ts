import { authClient } from "@/lib/auth-client";

export const createManyRecords = async (records: any) => {
  const session = await authClient.getSession();

  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BETTER_AUTH_URL}/records/many`,
      {
        method: "POST",
        body: JSON.stringify(records),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.session?.token || ""}`,
        },
        credentials: "include",
      }
    );
    
    return response;
  } catch (error) {
    console.log("Error creating records:", error);
    return null;
  }
};

import { authClient } from "@/lib/auth-client";

export const updateRecordServer = async (record: any) => {
  const session = await authClient.getSession();
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BETTER_AUTH_URL}/records/${record.id}`,
      {
        method: "PUT",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.session?.token || ""}`,
        },
        credentials: "include",
      }
    );

    return response;
  } catch (error) {
    console.log("Error updating record:", error);
    return null;
  }
};

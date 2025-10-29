export const selectMainCurrency = async (currency: string) => {
  try {
    const response = await fetch(`https://248eddea9de9.ngrok-free.app/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ body: { name: currency }}),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Failed to select main currency:", error);
    throw error;
  }
};
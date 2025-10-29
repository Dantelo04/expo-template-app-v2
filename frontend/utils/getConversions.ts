export const getConversions = async (primaryCurrency: string) => {
  try {
    const data = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${primaryCurrency}.json`
    );
    const json = await data.json();
    return json[primaryCurrency];
  } catch (error) {
    console.error(error);
    return {};
  }
};

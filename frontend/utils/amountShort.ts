import { removeCommas } from "./numberFormat";

export const amountShort = (amount: number) => {
  const maxAmount = 1000000000;
  const maxLength = 10;
  const maxDecimals = 8;
  
  if (amount >= maxAmount) {
    const divided = amount / 1000000;
    let formattedNumber = divided.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    while (formattedNumber.length + 1 > maxLength && formattedNumber.includes('.')) {
      const currentDecimals = formattedNumber.split('.')[1]?.length || 0;
      if (currentDecimals === 0) break;
      formattedNumber = divided.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: currentDecimals - 1 });
    }
    return formattedNumber + "M";
  } else {
    let formattedNumber = amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals });
    while (formattedNumber.length > maxLength && formattedNumber.includes('.')) {
      const currentDecimals = formattedNumber.split('.')[1]?.length || 0;
      if (currentDecimals === 0) break;
      formattedNumber = amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: currentDecimals - 1 });
    }
    return formattedNumber;
  }
};

export const amountShortGeneral = (amount: number) => {
  const maxAmount = 1000000;
  const maxLength = 8;
  const maxDecimals = 8;
  
  if (amount >= maxAmount) {
    const divided = amount / 1000000;
    let formattedNumber = divided.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    while (formattedNumber.length + 1 > maxLength && formattedNumber.includes('.')) {
      const currentDecimals = formattedNumber.split('.')[1]?.length || 0;
      if (currentDecimals === 0) break;
      formattedNumber = divided.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: currentDecimals - 1 });
    }
    return removeCommas(formattedNumber) + "M";
  } else {
    let formattedNumber = amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals });
    while (formattedNumber.length > maxLength && formattedNumber.includes('.')) {
      const currentDecimals = formattedNumber.split('.')[1]?.length || 0;
      if (currentDecimals === 0) break;
      formattedNumber = amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: currentDecimals - 1 });
    }
    return removeCommas(formattedNumber);
  }
};


/**
 * Formats a number string with commas for display using toLocaleString
 * @param value - The numeric string to format
 * @returns Formatted string with commas
 */
export const formatNumberWithCommas = (value: string): string => {
  // Handle empty string
  if (!value) return '';
  
  // If input looks like an arithmetic expression (operators beyond a leading '-')
  const hasOperators = /[+*/()]/.test(value) || (/-/.test(value) && !/^-/.test(value));
  
  if (hasOperators) {
    // Do not auto-format expressions; keep as typed
    return value;
  }

  // Check if the value starts with a minus sign (plain negative number)
  const isNegative = value.startsWith('-');
  
  // Clean the value, keeping only digits and decimal points
  const cleanValue = value;
  
  // Handle edge cases
  if (!cleanValue) return isNegative ? '-' : '';
  if (cleanValue === '.') return isNegative ? '-.' : '.';
  
  // Split into integer and decimal parts
  const parts = cleanValue.split('.');
  let integerPart = parts[0] || '';
  const decimalPart = parts[1];
  
  // Handle case where user types leading zeros (like "001")
  // Keep leading zeros while typing, but format normally otherwise
  if (integerPart && integerPart !== '0' && integerPart.length > 1) {
    // Remove leading zeros except for single zero
    integerPart = integerPart.replace(/^0+/, '') || '0';
  }
  
  // Use toLocaleString for proper formatting
  let formattedIntegerPart = integerPart;
  if (integerPart && integerPart.length > 0) {
    const numValue = parseInt(integerPart, 10);
    if (!isNaN(numValue)) {
      formattedIntegerPart = numValue.toLocaleString();
    }
  }
  
  // Construct the final number
  let formattedNumber = formattedIntegerPart;
  if (parts.length > 1) {
    // Always include decimal point if it was in the original
    formattedNumber += '.';
    if (decimalPart !== undefined) {
      formattedNumber += decimalPart;
    }
  }
  
  // Add the minus sign back if the original value was negative
  return isNegative ? `-${formattedNumber}` : formattedNumber;
};

/**
 * Validates if a string is a valid number format (digits and up to 2 decimal places, optionally negative)
 * @param value - The string to validate
 * @returns True if valid number format
 */
export const isValidNumberFormat = (value: string): boolean => {
  // Permit digits, decimal point, spaces, and arithmetic operators * + - / and parentheses
  // This allows partial expressions while typing
  return /^[\d+\-*/().\s]*$/.test(value);
};

/**
 * Removes commas from a formatted number string
 * @param value - The formatted string with commas
 * @returns Clean numeric string without commas
 */
export const removeCommas = (value: string | number): string => {
  const input = value === undefined || value === null ? "" : String(value);
  return input.replace(/,/g, "");
};

/**
 * Formats a number with commas only when necessary to reduce jumpiness
 * This version is more conservative about when to apply formatting
 * @param currentValue - The current input value
 * @param newValue - The new value being typed
 * @returns Formatted string, or original if formatting would be disruptive
 */
export const formatNumberSmooth = (currentValue: string, newValue: string): string => {
  // If user is typing an arithmetic expression, avoid reformatting
  if (/[+*/()]/.test(newValue) || (/-/.test(newValue) && !/^-/.test(newValue.trim()))) {
    return newValue;
  }

  // If user is typing at the end and the new value is just one character longer,
  // check if we really need to reformat
  if (newValue.length === currentValue.length + 1) {
    const cleanNew = removeCommas(newValue);
    const cleanCurrent = removeCommas(currentValue);
    
    // If the clean versions differ by exactly one character and it's a digit at the end,
    // apply formatting more conservatively
    if (cleanNew.length === cleanCurrent.length + 1 && /\d$/.test(cleanNew)) {
      const formatted = formatNumberWithCommas(cleanNew);
      // Only return the formatted version if it doesn't change the length dramatically
      if (Math.abs(formatted.length - newValue.length) <= 1) {
        return formatted;
      }
      return newValue; // Keep original to avoid jump
    }
  }
  
  // For other cases, use normal formatting
  const cleanValue = removeCommas(newValue);
  if (isValidNumberFormat(cleanValue)) {
    return formatNumberWithCommas(cleanValue);
  }
  
  return newValue;
}; 
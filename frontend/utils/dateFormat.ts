/**
 * Formats a date string as the user types, following the pattern 00/00/0000
 * @param value - The raw input string from user
 * @returns Formatted date string
 */
export const formatDateInput = (value: string): string => {
  // Remove all non-digit characters
  const cleanValue = value.replace(/\D/g, "");
  
  // Limit to 8 digits (MMDDYYYY)
  const limitedValue = cleanValue.slice(0, 8);
  
  // Format based on length
  if (limitedValue.length === 0) {
    return "";
  } else if (limitedValue.length <= 2) {
    // Just month
    return limitedValue;
  } else if (limitedValue.length <= 4) {
    // Month and day
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`;
  } else {
    // Month, day, and year
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2, 4)}/${limitedValue.slice(4)}`;
  }
};

/**
 * Validates if a date string is in the correct format (MM/DD/YYYY)
 * @param value - The date string to validate
 * @returns True if valid date format
 */
export const isValidDateFormat = (value: string): boolean => {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  return dateRegex.test(value);
};

/**
 * Validates if a date is a real, valid date (not just format)
 * @param value - The date string to validate (MM/DD/YYYY format)
 * @returns True if valid date
 */
export const isValidDate = (value: string): boolean => {
  if (!isValidDateFormat(value)) {
    return false;
  }
  
  const [month, day, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
};

/**
 * Converts a formatted date string to a Date object
 * @param value - The formatted date string (MM/DD/YYYY)
 * @returns Date object or null if invalid
 */
export const parseFormattedDate = (value: string): Date | null => {
  if (!isValidDate(value)) {
    return null;
  }
  
  const [month, day, year] = value.split('/').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Converts a Date object to formatted string (MM/DD/YYYY)
 * @param date - The Date object to format
 * @returns Formatted date string
 */
export const formatDateToString = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
};

/**
 * Removes formatting from a date string (MM/DD/YYYY -> MMDDYYYY)
 * @param value - The formatted date string
 * @returns Clean date string without formatting
 */
export const removeDateFormatting = (value: string): string => {
  return value.replace(/\//g, "");
};

/**
 * Gets the current date in formatted string (MM/DD/YYYY)
 * @returns Current date as formatted string
 */
export const getCurrentDateFormatted = (): string => {
  return formatDateToString(new Date());
};

export const checkEval = (value: string): any => {
  const input = value === undefined || value === null ? "" : String(value);
  if (!input) return input;

  // Remove thousands separators and trim spaces
  const expr = input.replace(/,/g, "").trim();

  // If it's a plain number (no operators), don't evaluate; keep as-is to avoid showing the eval button
  if (/^-?\d*(?:\.\d+)?$/.test(expr)) {
    return input;
  }

  // Allow only safe math characters
  if (!/^[\d+\-*/().\s]+$/.test(expr)) {
    return input;
  }

  // Avoid evaluating if expression ends with an operator or decimal point
  if (/[+\-*/.]$/.test(expr)) {
    return value;
  }

  try {
    // Safely evaluate arithmetic expression
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${expr});`)();

    if (
      typeof result === "number" &&
      Number.isFinite(result) &&
      !Number.isNaN(result)
    ) {
      return result;
    }
  } catch (_) {
    // Swallow syntax/runtime errors and fall back to original value
  }

  return input;
};

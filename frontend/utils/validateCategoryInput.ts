export const validateCategoryInput = (input: string, categories: string[]) => {
  if (
    input === "" ||
    input.includes(" ") ||
    input.length < 3 ||
    input.length > 20 ||
    input.includes(".") ||
    categories.some((category) => category.split(".")[1] === input)
  )
    return false;
  return true;
};

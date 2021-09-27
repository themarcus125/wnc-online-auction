export const validateEmail = (str: string): boolean => {
  if (!str) return false;
  const re: RegExp = /.+@.+\..+/;
  return re.test(str);
};

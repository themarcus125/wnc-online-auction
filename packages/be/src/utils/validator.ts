export const validateEmail = (val: string): boolean => {
  if (!val) return false;
  const re: RegExp = /.+@.+\..+/;
  return re.test(val);
};

export const validatePassword = (val: string): boolean => {
  if (!val) return false;
  return val.length >= 6;
};

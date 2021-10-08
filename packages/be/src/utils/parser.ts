export const safeInt = (val: any): [boolean, Number] => {
  const parsed = parseInt(val);
  return [!isNaN(parsed), isNaN(parsed) ? 0 : parsed];
};

export const safePositive = (val: any): [boolean, Number] => {
  const parsed = Math.abs(parseFloat(val || 0));
  return [!isNaN(parsed), isNaN(parsed) ? 0 : parsed];
};

export const parseIntDefault = (val: any, defaultValue: number) => {
  if (!val) return defaultValue;
  const parsed = parseInt(val);
  if (isNaN(parsed)) return defaultValue;
  return parsed;
};

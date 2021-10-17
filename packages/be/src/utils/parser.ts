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

export const parseSort = (val?: any) => {
  if (!val) return undefined;
  if (val === 'desc') return -1;
  if (val === 'asc') return 1;
  return undefined;
};

export const parseBoolean = (val?: any) => {
  if (!val) return null;
  if (val === 'true') return true;
  if (val === 'false') return false;
  return null;
};

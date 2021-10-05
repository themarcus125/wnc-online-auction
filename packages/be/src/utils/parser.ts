export const safeInt = (val: any): [boolean, Number] => {
  const parsed = parseInt(val);
  return [!isNaN(parsed), isNaN(parsed) ? 0 : parsed];
};

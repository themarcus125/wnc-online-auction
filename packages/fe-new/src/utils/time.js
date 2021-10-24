export const hoursToString = (value) => {
  const units = {
    day: 24,
    hour: 1,
  };
  const label = {
    day: 'ngày',
    hour: 'giờ',
  };

  let x = value;
  const results = [];
  for (const unit in units) {
    const n = Math.floor(x / units[unit]);
    if (n > 0) {
      results.push(`${n} ${label[unit]}`);
      x %= units[unit];
    }
  }

  return results.join(', ');
};

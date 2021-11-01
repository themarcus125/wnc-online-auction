export const checkIfValidBid = (bidPrice, stepPrice, startPrice) => {
  const difPrice = bidPrice - startPrice;
  const temp = Math.floor(difPrice / stepPrice);

  return temp * stepPrice === difPrice;
};

export const maskedString = (str) => {
  const maskLength = Math.floor((str.length * 2) / 3);
  return '*'.repeat(maskLength) + str.substring(maskLength);
};

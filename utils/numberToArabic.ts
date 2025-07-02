export const numberToArabic = (number: number) => {
  return number.toString().replace(/\d/g, (digit) => {
    return String.fromCharCode(1632 + parseInt(digit));
  });
};

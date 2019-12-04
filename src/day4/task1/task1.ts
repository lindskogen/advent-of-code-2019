
export const runProgram = (start: number, end: number): number => {
  let n = 0;
  for (let i = start; i <= end; i++) {
    if (validateNumber(String(i))) {
      n++;
    }
  }

  return n;
};

export const validateNumber = (str: string): boolean => {
  const length = str.length;
  let lastNumber = 0;
  let hasDoubleDigits = false;
  for (let i = 0; i < length; i++) {
    let x = parseInt(str.charAt(i));
    if (x < lastNumber) {
      return false;
    } else if (x === lastNumber) {
      hasDoubleDigits = true;
    }
    lastNumber = x;
  }

  return hasDoubleDigits;
};

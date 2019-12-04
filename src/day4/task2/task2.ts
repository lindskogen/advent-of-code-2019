

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
  let numOfCurrNum = 1;
  for (let i = 0; i < length; i++) {
    let x = parseInt(str.charAt(i), 10);
    if (x < lastNumber) {
      return false;
    } else if (x === lastNumber) {
      numOfCurrNum += 1;
    } else {
      if (numOfCurrNum === 2) {
        hasDoubleDigits = true;
      }
      numOfCurrNum = 1;
    }

    lastNumber = x;
  }
  if (numOfCurrNum === 2) {
    hasDoubleDigits = true;
  }

  return hasDoubleDigits;
};

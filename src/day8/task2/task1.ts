const range = (n: number) => [...Array(n).keys()];

export const countOccurrencesOfChar = (input: string, char: string) =>
  [...input].filter(s => s === char).length;

const splitStringIntoLength = (
  input: string,
  length: number,
  maxNumber: number
): string[] =>
  range(maxNumber).map(index =>
    input.slice(index * length, index * length + length)
  );

export const partition = (
  input: string,
  width: number,
  height: number
): string[][] => {
  let buffer = input.trim();
  let rows: string[][] = [];
  while (buffer.length > 0) {
    let layer = splitStringIntoLength(buffer, width, height);
    rows.push(layer);
    buffer = buffer.substring(layer.length * width);
  }
  return rows;
};

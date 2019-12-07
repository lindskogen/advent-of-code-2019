import { parseInput, runProgram } from "../../day5/task2/task2";

function* permute<T>(a: T[], n = a.length): Generator<T[]> {
  if (n <= 1) {
    yield a.slice();
  } else {
    for (let i = 0; i < n; i++) {
      yield* permute(a, n - 1);
      const j = n % 2 ? 0 : i;
      [a[n - 1], a[j]] = [a[j], a[n - 1]];
    }
  }
}

export const maxThrusters = (program: string) => {
  const codes = parseInput(program);

  let max = 0;
  for (let input of permute([0, 1, 2, 3, 4])) {
    let output = input.reduce((result, setting, index) => {
        const outputs = runProgram(codes.slice(), [setting, result]);
        return outputs[0];
      }, 0);

    if (output > max) {
      max = output;
    }
  }
  return max;
};

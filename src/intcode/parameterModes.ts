export enum ParameterMode {
  Position = 0,
  Immeditate = 1,
  Relative = 2
}

export const calculateParameterModes = (
  input: number
): [[ParameterMode, ParameterMode, ParameterMode], number] => {
  let parameterMode: [ParameterMode, ParameterMode, ParameterMode] = [0, 0, 0];
  let instruction = input;
  if (instruction > 99) {
    let x = Math.floor(instruction / 100);

    parameterMode = [
      x % 10,
      Math.floor((x / 10) % 10),
      Math.floor((x / 100) % 10)
    ];
    instruction = Math.floor(instruction % 100);
  }

  return [parameterMode, instruction];
};

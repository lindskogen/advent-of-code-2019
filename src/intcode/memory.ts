import { ParameterMode } from "./parameterModes";

export const getAddressWithParameterMode = (
  relativeBase: number,
  param: number,
  paramMode: ParameterMode
): number => {
  switch (paramMode) {
    case ParameterMode.Position:
      return param;
    case ParameterMode.Immediate:
      return param;
    case ParameterMode.Relative:
      return relativeBase + param;
    default:
      throw new Error("Unknown parameter mode " + paramMode);
  }
};
export const getValueWithParameterMode = (
  opCodes: number[],
  relativeBase: number,
  param: number,
  paramMode: ParameterMode
): number => {
  if (paramMode === ParameterMode.Immediate) {
    return param;
  } else {
    return opCodes[getAddressWithParameterMode(relativeBase, param, paramMode)] ?? 0;
  }
};

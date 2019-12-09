export enum IntCodeOp {
  Add = 1,
  Mul = 2,
  In = 3,
  Out = 4,
  JmpTrue = 5,
  JmpFalse = 6,
  LessThan = 7,
  Equals = 8,
  SetRel = 9,
  Halt = 99
}

export const instructionLength: Record<IntCodeOp, number> = {
  [IntCodeOp.Add]: 3,
  [IntCodeOp.Mul]: 3,
  [IntCodeOp.In]: 1,
  [IntCodeOp.Out]: 1,
  [IntCodeOp.JmpTrue]: 2,
  [IntCodeOp.JmpFalse]: 2,
  [IntCodeOp.LessThan]: 3,
  [IntCodeOp.Equals]: 3,
  [IntCodeOp.SetRel]: 1,
  [IntCodeOp.Halt]: 0
};

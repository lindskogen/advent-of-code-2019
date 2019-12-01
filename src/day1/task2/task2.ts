import { getFuel } from "../task1/task1";

export const getFuelForMass = (mass: number): number => {
  let fuel = getFuel(mass);
  if (fuel > 0) {
    return fuel + getFuelForMass(fuel); 
  } else {
    return 0;
  }
}

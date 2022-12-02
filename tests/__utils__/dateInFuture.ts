import { yextDate } from "../../src/components/hours/utils";

export function dateInFuture(daysForward: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysForward);

  return yextDate(d);
}

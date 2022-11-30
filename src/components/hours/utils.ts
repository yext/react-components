import { DayOfWeek } from "../hoursTable/types";

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export function getDays(size: number, start?: DayOfWeek): DayOfWeek[] {
  const pivot = start
    ? DAYS_OF_WEEK.findIndex(day => day === start)
    : new Date().getDay();
  const pivotedWeek =  DAYS_OF_WEEK.slice(pivot).concat(DAYS_OF_WEEK.slice(0, pivot));

  return Array(size).fill('').map((_, i) => pivotedWeek[i % pivotedWeek.length]);
}

export function daysSince(startOfWeek: DayOfWeek, date = new Date()): number {
  const start = DAYS_OF_WEEK.findIndex(day => day === startOfWeek);
  const current = date.getDay();
  return Math.abs(start - current);
}

export function yextDate(date = new Date()): string {
  const yyyy = "" + date.getFullYear();
  let mm = "" + (date.getMonth() + 1);
  let dd = "" + date.getDate();

  if (mm.length < 2) {
    mm = "0" + mm;
  }
  if (dd.length < 2) {
    dd = "0" + dd;
  }

  return [yyyy, mm, dd].join("-");
}

export function parseDate(yextDate: string): Date | undefined {
  const [yyyy, mm, dd] = yextDate.split("-").map(str => parseInt(str));

  if (!yyyy || !mm || !dd) {
    console.error("Invalid date format, must be 'YYYY-MM-DD'");
    return undefined;
  }

  const date = new Date();
  date.setFullYear(yyyy);
  date.setMonth(mm - 1);
  date.setDate(dd);

  return date;
}

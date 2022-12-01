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

/**
 * Create a list of days to include in the {@link HoursTable}
 * 
 * @example
 * A list of 7 days starting on a Thursday:
 * ```
 * // Returns ['thursday', 'friday', 'saturday', 'sunday','monday',
 * 'tuesday', 'wednesday']
 * getDays(7, 'thursday');
 * ```
 * 
 * @example
 * A list of 11 days starting on a Wednesday:
 * ```
 * // Returns ['wednesday', 'thursday', 'friday', 'saturday', 'sunday',
 * 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
 * getDays(11, 'wednesday');
 * ```
 * 
 * @param size - number of days to include
 * @param start - the day of week to start on
 * @returns a list of days of week
 */
export function getDays(size: number, start?: DayOfWeek): DayOfWeek[] {
  const pivot = start
    ? DAYS_OF_WEEK.findIndex(day => day === start)
    : new Date().getDay();
  const pivotedWeek =  DAYS_OF_WEEK.slice(pivot).concat(DAYS_OF_WEEK.slice(0, pivot));

  return Array(size).fill('').map((_, i) => pivotedWeek[i % pivotedWeek.length]);
}

/**
 * Determine the number of days since a particular day of the week.
 *
 * @param dayOfWeek - day of week the table starts on.
 * @param date - the date to compare, defaults to current date.
 * @returns number of days.
 */
export function daysSince(dayOfWeek: DayOfWeek, date = new Date()): number {
  const start = DAYS_OF_WEEK.findIndex(day => day === dayOfWeek);
  const current = date.getDay();
  return current - start;
}

/**
 * Get the current or specified date as "YYYY-MM-DD".
 * 
 * @example
 * ```
 * // Returns "2022-11-31"
 * yextDate();
 * ```
 *
 * @param date a Javascript Date object, defaults to current date.
 * @returns - Date as "YYYY-MM-DD".
 */
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

/**
 * Converts a Yext date format into a Javascript Date object.
 * 
 * @example
 * Example getting a Javascript Date object for November 11, 2022:
 * ```
 * parseDate("2022-11-31");
 * ```
 *
 * @param yextDate a Yext date formatted string.
 * @returns 
 */
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

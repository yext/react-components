import {
  Hours
} from "@yext/types";

/**
 * The available keys that represent a day of the week
 */
export type DayOfWeek = keyof Omit<Hours, "holidayHours" | "reopenDate">;

/**
 * The available options for formating a localized time string
 */
export type LocalizeTime = {
  /** The locale to format the time against */
  locales?: Intl.LocalesArgument;
  /** The options to format the time against */
  options?: Intl.DateTimeFormatOptions;
}

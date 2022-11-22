import {
  Hours
} from "@yext/types";

export type DayOfWeek = keyof Omit<Hours, "holidayHours" | "reopenDate">;

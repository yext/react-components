import { Hours } from "@yext/types";
import { dateInFuture } from "../../__utils__/dateInFuture";

export const HOURS: Hours = {
  monday: {
    isClosed: false,
    openIntervals: [{ start: "9:01", end: "18:01" }],
  },
  tuesday: {
    isClosed: false,
    openIntervals: [{ start: "9:02", end: "18:02" }],
  },
  wednesday: {
    isClosed: false,
    openIntervals: [{ start: "9:03", end: "18:03" }],
  },
  thursday: {
    isClosed: false,
    openIntervals: [{ start: "9:04", end: "18:04" }],
  },
  friday: {
    isClosed: false,
    openIntervals: [{ start: "9:05", end: "18:05" }],
  },
  saturday: {
    isClosed: false,
    openIntervals: [{ start: "9:06", end: "18:06" }],
  },
  sunday: {
    isClosed: false,
    openIntervals: [
      { start: "9:00", end: "11:00" },
      { start: "12:00", end: "18:00" },
    ],
  },
};

export const HOURS_WITH_HOLIDAY: Hours = {
  ...HOURS,
  holidayHours: [
    {
      date: dateInFuture(0),
      openIntervals: [{ start: "9:00", end: "12:00" }],
      isClosed: false,
    },
    {
      date: dateInFuture(1),
      openIntervals: [],
      isClosed: true,
    },
  ],
};

export const HOURS_WITH_REOPEN_DATE: Hours = {
  ...HOURS,
  reopenDate: dateInFuture(3),
};


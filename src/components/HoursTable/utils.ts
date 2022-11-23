const DEFAULT_TO_LOCALE_TIME_STRING: [
  Intl.LocalesArgument,
  Intl.DateTimeFormatOptions
] = ['en-us', { hour: "numeric", minute: "numeric" }];

export function parseTime(yextTime: string | undefined, toLocaleTimeString = DEFAULT_TO_LOCALE_TIME_STRING): string {
  if (!yextTime?.includes(":")) {
    console.error(`Invalid time format, must be 'HH:MM`);
    return "";
  }

  const [hour, minute] = yextTime.split(":");
  const date = new Date();

  date.setHours(Number(hour));
  date.setMinutes(Number(minute));

  return date.toLocaleTimeString(...toLocaleTimeString);
}

export function format(str: string, ...args: string[]): string {
  for (const [i, arg] of args.entries()) {
    str = str.replace(new RegExp("\\{" + i + "\\}"), arg);
  }
  return str;
}

export function toCapitalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export interface HoursTableIntervalProps {
  start?: string;
  end?: string;
  toLocaleDateString: [
    Intl.LocalesArgument,
    Intl.DateTimeFormatOptions
  ]
}

export default function HoursTableInterval(props: IntervalProps) {
  const parseTime = (yextTime: string | undefined): string => {
    const [hour, minute] = validTime(yextTime).split(":");
    const date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));

    return date.toLocaleTimeString(...props.toLocaleDateString);
  }

  const validTime = (yextTime?: string | undefined): string => {
    if (!yextTime && !yextTime?.includes(":")) {
      throw new Error("Not a valid time format, must be XX:XX.");
    }

    return yextTime;
  }

  const start = parseTime(props.start);
  const end = parseTime(props.end);

  return (
    <span>
      {start} - {end}
    </span>
  )
}
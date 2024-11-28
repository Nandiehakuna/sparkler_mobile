import { format, differenceInHours, differenceInMinutes } from "date-fns";

const isLessThan1Hour = (timeDiff: number): boolean =>
  timeDiff < 60 * 60 * 1000;

const isLessThan24Hours = (timeDiff: number): boolean =>
  timeDiff < 24 * 60 * 60 * 1000;

export const getTimeText = (time: Date | string): string => {
  const currentTime = new Date();
  const givenTime = new Date(time);

  if (isNaN(givenTime.getTime())) return "";

  const timeDiff = currentTime.getTime() - givenTime.getTime();

  if (isLessThan1Hour(timeDiff)) {
    const minutes = differenceInMinutes(currentTime, givenTime);
    return `${minutes}m`;
  }

  if (isLessThan24Hours(timeDiff)) {
    const hours = differenceInHours(currentTime, givenTime);
    return `${hours}h`;
  }

  return format(givenTime, "MMM d");
};

export const getThreadTime = (time: string): string =>
  format(new Date(time), "PP");

import { DateRange } from "react-day-picker";
import { Booking } from "./types";

export const defaultSelected: DateRange = {
  from: undefined,
  to: undefined,
};

export const calculateDaysBetween = ({
  checkIn,
  checkOut,
}: {
  checkIn: Date;
  checkOut: Date;
}) => {
  // difference in milliseconds
  const diffInMs = Math.abs(checkOut.getTime() - checkIn.getTime());

  // calculating days based on total milliseconds
  const totalDays = diffInMs / (1000 * 60 * 60 * 24);

  return totalDays;
};

export const generateBlockedPeriods = ({
  bookings,
  today,
}: {
  bookings: Booking[];
  today: Date;
}): DateRange[] => {
  today.setHours(0, 0, 0, 0);
  const blockedDates: DateRange[] = bookings.map((booking) => {
    const adjustedCheckOutDate = new Date(
      booking.checkOut.getTime() - 1000 * 60 * 60 * 24
    );

    return { from: booking.checkIn, to: adjustedCheckOutDate };
  });

  return [
    ...blockedDates,
    { from: new Date(0), to: new Date(today.getTime() - 1000 * 60 * 60 * 24) },
  ];
};

export const generateBlockedDates = (
  disabledDays: DateRange[]
): { [key: string]: boolean } => {
  const blockedDatesObject: { [key: string]: boolean } = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  disabledDays.forEach((range) => {
    if (!range.from || !range.to) return;

    let currentDate = new Date(range.from);
    const endDate = new Date(range.to);

    if (endDate < today) return; //  don't include bookings that has start and end dates before today.

    if (currentDate < today) currentDate = new Date(today); //  if the range date is before today then set start date to today.

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];

      blockedDatesObject[dateString] = true;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return blockedDatesObject;
};

export const generateSelectedDates = (
  range: DateRange | undefined
): string[] => {
  if (!range || !range.from || !range.to) return [];

  const selectedDatesArray = [];
  let currentDate = new Date(range.from);
  const endDate = new Date(range.to);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    selectedDatesArray.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return selectedDatesArray;
};

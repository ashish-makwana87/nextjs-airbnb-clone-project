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
  const blockedDates = bookings.map((booking) => {
    return { from: booking.checkIn, to: booking.checkOut };
  });

  return [
    ...blockedDates,
    { from: new Date(0), to: new Date(today.getTime() - 1000 * 60 * 60 * 24) },
  ];
};

import { create } from "zustand";
import { Booking } from "./types";
import { DateRange } from "react-day-picker";

// The purpose to use DateRange from day-picker library is that shadcn calendar component also uses the same type. This helps to achieve compatibility.

type PropertyBookingState = {
  propertyId: string;
  price: number;
  bookings: Booking[];
  range: DateRange | undefined;
};

export const useProperty = create<PropertyBookingState>(() => {
  return { propertyId: "", price: 0, bookings: [], range: undefined };
});


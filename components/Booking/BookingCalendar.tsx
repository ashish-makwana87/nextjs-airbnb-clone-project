"use client";
import { defaultSelected, generateBlockedPeriods } from "@/utils/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { useProperty } from "@/utils/store";

function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  
  const bookings = useProperty((state) => state.bookings)
  const blockedPeriods = generateBlockedPeriods({bookings, today: currentDate})

  useEffect(() => { 
    useProperty.setState({ range });
  }, [range]);

  return (
    <div className="border rounded flex items-center justify-center mb-4">
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      disabled={blockedPeriods}
      />
      </div>
  );
}

export default BookingCalendar;

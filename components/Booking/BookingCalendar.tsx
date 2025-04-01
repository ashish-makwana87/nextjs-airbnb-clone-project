"use client";
import {
  defaultSelected,
  generateBlockedDates,
  generateBlockedPeriods,
  generateSelectedDates,
} from "@/utils/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { useProperty } from "@/utils/store";
import { useToast } from "@/hooks/use-toast";

function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const bookings = useProperty((state) => state.bookings);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  
  const { toast } = useToast();
  const blockedDates = generateBlockedDates(blockedPeriods);
  

  useEffect(() => {
    const selectedDates = generateSelectedDates(range);

    const isUnavailableDateSelected = selectedDates.some((date) => {

    return blockedDates[date];
    });
    
    if(isUnavailableDateSelected) {
      setRange(defaultSelected);
        toast({
          description:
            "Some of the dates are already booked. Please select other dates",
        });
    }

    useProperty.setState({ range });
  }, [range]);

  return (
    <div className='border rounded flex items-center justify-center mb-4'>
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

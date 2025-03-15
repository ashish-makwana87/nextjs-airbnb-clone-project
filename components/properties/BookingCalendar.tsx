'use client'
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar"
import { useState } from "react";


function BookingCalendar() {
 
 const currentDate = new Date();
 const defaultSelected: DateRange = {
  from: undefined,
  to: undefined
 }

 const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
 
 console.log(range);
 
  return (
    <Calendar mode='range' selected={range} defaultMonth={currentDate} onSelect={setRange} />
  )
}

export default BookingCalendar
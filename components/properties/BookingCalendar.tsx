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
   <div className="border flex items-center justify-center rounded p-2 w-full" >
    <Calendar mode='range' selected={range} defaultMonth={currentDate} onSelect={setRange} />
   </div>
  )
}

export default BookingCalendar
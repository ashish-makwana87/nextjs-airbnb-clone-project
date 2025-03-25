'use client';
import { defaultSelected } from "@/utils/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { useProperty } from "@/utils/store";


function BookingCalendar() {

  const currentDate = new Date()
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
  
  useEffect(() => {
   useProperty.setState({range})
  }, [range])

  return (
    <div className="border flex items-center justify-center rounded p-2 w-full mb-4">
      <Calendar mode="range" defaultMonth={currentDate} selected={range} onSelect={setRange} />
    </div>
  )
}

export default BookingCalendar
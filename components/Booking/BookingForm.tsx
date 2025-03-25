'use client';

import { calculateTotals } from "@/utils/calculateTotals";
import { useProperty } from "@/utils/store";


function BookingForm() {
 
  const {range, price} = useProperty((state) => state);
  
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const bookingDetails = calculateTotals({checkIn, checkOut, price})
  
  return (
    <div>BookingForm</div>
  )
}

export default BookingForm
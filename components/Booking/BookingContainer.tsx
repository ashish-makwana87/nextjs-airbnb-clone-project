'use client';
import { useProperty } from "@/utils/store";
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";


function BookingContainer() {

 const {range} = useProperty((state) => state)

 if(!range || !range.from || !range.to) return null;
 
 if(range.to.getTime() === range.from.getTime()) return null;

  return (
    <div>
      <BookingForm />
      <ConfirmBooking />
    </div>
  )
}

export default BookingContainer
'use client'
import { useProperty } from "@/utils/store"
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";

function BookingContainer() {

 const state = useProperty((state) =>  state)

 console.log(state);
 

  return (
    <div>
      <BookingForm />
      <ConfirmBooking />
    </div>
  )
}

export default BookingContainer
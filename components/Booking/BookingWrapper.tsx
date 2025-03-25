'use client'
import { useProperty } from '@/utils/store';
import { Booking } from '@/utils/types';
import { useEffect } from 'react';
import BookingCalendar from './BookingCalendar';
import BookingContainer from './BookingContainer';

type BookingWrapperProps = {
  propertyId: string, 
  price: number,
  bookings: Booking[]
}

function BookingWrapper({propertyId, price, bookings}: BookingWrapperProps) {
   
  useEffect(() => {
    useProperty.setState({
      propertyId,
      price,
      bookings
    })
  }, [])
  
  return (
    <section>
      <BookingCalendar />
      <BookingContainer />
    </section>
  )
}

export default BookingWrapper
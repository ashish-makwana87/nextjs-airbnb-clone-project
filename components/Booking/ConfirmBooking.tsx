"use client";
import { useProperty } from "@/utils/store";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { createBookingAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";

function ConfirmBooking() {
  const { userId } = useAuth();
  const { range, propertyId } = useProperty((state) => state);

  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId) {
    return (
      <SignInButton mode='modal'>
        <Button type='submit' className='w-full'>
          Sign In to Complete Booking
        </Button>
      </SignInButton>
    );
  }

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });

  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer>
    </section>
  );
}

export default ConfirmBooking;

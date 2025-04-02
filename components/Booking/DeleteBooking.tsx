import { deleteBookingAction } from "@/utils/actions"
import FormContainer from "../form/FormContainer"
import { IconButton } from "../form/Buttons"


function DeleteBooking({bookingId}:{bookingId:string}) {
  
 const deleteBooking = deleteBookingAction.bind(null, {bookingId})

  return (
    <FormContainer action={deleteBooking}>
     <IconButton actionType="delete" />
    </FormContainer>
  )
}

export default DeleteBooking
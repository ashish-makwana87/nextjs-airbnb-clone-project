import FormContainer from '../form/FormContainer'
import { deleteRentalAction } from '@/utils/actions'
import { IconButton } from '../form/Buttons'

function DeleteRental({propertyId}:{propertyId:string}) {
 
  
 const deleteRental = deleteRentalAction.bind(null, {propertyId})

  return (
    <FormContainer action={deleteRental}>
    <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default DeleteRental
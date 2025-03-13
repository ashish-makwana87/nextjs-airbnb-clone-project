'use client'
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer"
import { CardSubmitButton } from "../form/Buttons"
import { toggleFavoriteAction } from "@/utils/actions"

function FavoriteToggleForm({propertyId, favoriteId}:{propertyId: string, favoriteId: string | null}) {
  
 const pathname = usePathname()
 const toggleAction = toggleFavoriteAction.bind(null, {propertyId, favoriteId, pathname})

  return (
    <FormContainer action={toggleAction}>
     <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  )
}

export default FavoriteToggleForm;
import { FaHeart } from "react-icons/fa"
import { Button } from "../ui/button"
import { auth } from "@clerk/nextjs/server"
import { CardSignInButton } from "../form/Buttons";
import FavoriteToggleForm from "./FavoriteToggleForm";
import { fetchFavoriteId } from "@/utils/actions";


async function FavoriteToggleButton({propertyId}:{propertyId: string}) {

  const {userId} = auth(); 
 
  if(!userId) {
    return <CardSignInButton />
  }

 const favoriteId = await fetchFavoriteId({propertyId})

  return (
    <FavoriteToggleForm propertyId={propertyId} favoriteId={favoriteId} />
  )
}

export default FavoriteToggleButton;
import { FaHeart } from "react-icons/fa"
import { Button } from "../ui/button"


function FavoriteToggleButton() {


  return (
   <button type="submit" >
    <FaHeart className="w-5 h-5 text-white hover:text-primary" />
   </button>
  )
}

export default FavoriteToggleButton
import { fetchPropertyRating } from "@/utils/actions";
import { FaStar } from "react-icons/fa";

async function PropertyRatings({propertyId, inPage}: {propertyId: string, inPage: boolean}) {
 
 const ratings = await fetchPropertyRating(propertyId)
 
 const averageRatings = ratings.rating;
 const totalReviews = ratings.count; 
 const className = `flex gap-x-1 items-center ${inPage ? 'text-base' : 'text-xs'}`;
 const countText = totalReviews > 1 ? ' reviews' : ' review';
 const countValue = `${totalReviews}${inPage ? countText : ''}`

  return (
    <span className={className}>
     <FaStar className="w-3 h-3" />
     <p>{averageRatings}</p>
     <p>({countValue})</p>
    </span>
  )
}

export default PropertyRatings
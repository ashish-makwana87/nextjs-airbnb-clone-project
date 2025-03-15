import { FaStar } from "react-icons/fa";

function PropertyRatings({propertyId, inPage}: {propertyId: string, inPage: boolean}) {
 
 const averageRatings = 4.7;
 const totalReviews = 92; 
 const className = `flex gap-x-1 items-center ${inPage ? 'text-base' : 'text-xs'}`;
 const countText = totalReviews > 1 ? ' Reviews' : ' Review';
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
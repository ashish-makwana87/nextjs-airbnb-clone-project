import { fetchPropertyReviews } from "@/utils/actions"
import ReviewCard from "./ReviewCard"


async function PropertyReviews({propertyId}:{propertyId: string}) {
  
  const reviews = await fetchPropertyReviews(propertyId)
   
  if(reviews.length < 1) return null

  return <div className="mt-4 md:mt-6">
    <h4 className="head-5 capitalize mb-3">Reviews by Users</h4>
    <div className="grid gap-4 md:grid-cols-2 ">
  {reviews.map((review) => {
    
    return <ReviewCard key={review.id} review={review} />
  })}
  </div>
  </div>
}

export default PropertyReviews
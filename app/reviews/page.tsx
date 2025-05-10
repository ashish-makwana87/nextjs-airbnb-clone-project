import EmptyList from "@/components/home/EmptyList";
import ReviewCardUser from "@/components/reviews/ReviewCardUser";
import { fetchPropertyReviewsByUser } from "@/utils/actions";
import { divIcon } from "leaflet";

async function ReviewsPage() {

  const reviews = await fetchPropertyReviewsByUser();
  
  if(reviews.length < 1) {return <div className="alignment mt-10 md:my-20">
    <EmptyList title="Write some reviews and they will appear here." />
  </div> }

  return <div className="alignment my-10 md:my-20 relative">
    <h1 className="head-1 capitalize mb-4 md:mb-6">Your Reviews</h1>
    <div className="grid gap-4 md:grid-cols-2">
    {reviews.map((review) => {
      return <ReviewCardUser key={review.id} review={review} />
    })}
    </div>
  </div>;
}

export default ReviewsPage;

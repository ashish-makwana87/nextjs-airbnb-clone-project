import EmptyList from "@/components/home/EmptyList";
import ReviewCardUser from "@/components/reviews/ReviewCardUser";
import { fetchPropertyReviewsByUser } from "@/utils/actions";
import { divIcon } from "leaflet";

async function ReviewsPage() {

  const reviews = await fetchPropertyReviewsByUser();
  
  if(reviews.length < 1) {return <div className="alignment mt-10 md:my-20">
    <EmptyList title="Write some reviews and they will appear here." />
  </div> }

  return <div className="alignment mt-10 md:my-20">
    <h4 className="head-3 capitalize mb-3">Your Reviews</h4>
    <div className="grid gap-4 md:grid-cols-2 ">
    {reviews.map((review) => {
      return <ReviewCardUser key={review.id} review={review} />
    })}
    </div>
  </div>;
}

export default ReviewsPage;

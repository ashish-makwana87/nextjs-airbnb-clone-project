import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import RatingStars from './RatingStars'
import ReviewComment from './ReviewComment'

type ReviewCardType = {
  id: string,
      rating: number,
      comment: string,
      profile: {profileImage: string, firstName: string}
}


function ReviewCard({review}:{review: ReviewCardType}) {

  return (
    <section className='border rounded-md p-4 shadow'>
      <div className='flex gap-x-4 items-center '>
     <Image src={review.profile.profileImage} alt={review.id} width={300} height={300} className='h-12 w-12 md:w-14 md:h-14 rounded-full object-cover' />
     <div>
      <h6 className='head-6 font-medium capitalize'>{review.profile.firstName}</h6>
      <RatingStars rating={review.rating} />
      </div>
     </div>
     <ReviewComment comment={review.comment} />
    </section>
  )
}

export default ReviewCard
import Image from "next/image";
import React from "react";
import ReviewComment from "./ReviewComment";
import RatingStars from "./RatingStars";
import FormContainer from "@/components/form/FormContainer";
import { deleteReviewAction} from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { IconButton } from "../form/Buttons";

type UserReviewType = {
  id: string;
  rating: number;
  comment: string;
  property: { image: string; name: string };
};


function ReviewCardUser({ review }: { review: UserReviewType }) {

  return (
    <section className='border rounded-md p-4 shadow relative'>
      <div className='flex gap-x-4 items-center '>
        <Image
          src={review.property.image}
          alt={review.property.name}
          width={300}
          height={300}
          className='h-12 w-12 md:w-14 md:h-14 rounded-full object-cover'
          />
          <div>
           <h5 className='head-6 font-medium capitalize'>{review.property.name}</h5>
           <RatingStars rating={review.rating} />
          </div>
      </div>
      <ReviewComment comment={review.comment} />
      <div className=" absolute right-2 top-2">
      <FormContainer action={deleteReviewAction}>
       <Input type='hidden' name="reviewId" value={review.id} />
       <IconButton actionType='delete' />
      </FormContainer>
    </div>
    </section>
  );
}

export default ReviewCardUser;

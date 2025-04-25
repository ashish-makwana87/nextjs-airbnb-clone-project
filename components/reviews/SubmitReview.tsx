"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";

function SubmitReview({ propertyId }: { propertyId: string }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className='mt-4 md:mt-6'>
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>
        Submit Review
      </Button>
      {isFormVisible && (
        <div className='mt-4 border p-4 md:p-6 rounded-md'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='propertyId' value={propertyId} />
            <RatingInput name='rating' />
            <TextAreaInput
              name='comment'
              label='your review'
              defaultValue='Beautiful place to stay.'
            />
            <SubmitButton />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default SubmitReview;

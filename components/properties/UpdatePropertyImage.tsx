"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import ImageInput from "../form/ImageInput";
import { SubmitButton } from "../form/Buttons";
import { updatePropertyImageAction } from "@/utils/actions";

function UpdatePropertyImage({propertyId}:{propertyId: string}) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div>
      <Button variant='outline' onClick={() => setIsFormVisible(!isFormVisible)}>
        Update Image
      </Button>
      {isFormVisible && (
        <div className='mt-4'>
          <FormContainer action={updatePropertyImageAction}>
            <input type="hidden" name="id" value={propertyId} />
            <ImageInput />
            <SubmitButton text='Submit' size='sm' className='text-sm' />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default UpdatePropertyImage;

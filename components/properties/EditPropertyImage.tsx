"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import ImageInput from "../form/ImageInput";
import { SubmitButton } from "../form/Buttons";
import { updatePropertyImageAction } from "@/utils/actions";

function EditPropertyImage() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>
        Update Image
      </Button>
      {isFormVisible && (
        <div className='mt-4'>
          <FormContainer action={updatePropertyImageAction}>
            <ImageInput />
            <SubmitButton text='Submit' size='sm' className='text-sm' />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default EditPropertyImage;

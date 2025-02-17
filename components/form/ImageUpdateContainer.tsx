"use client";
import Image from "next/image";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import ImageInput from "./ImageInput";
import { actionFunction } from "@/utils/types";
import { LucideUser2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type ImageUpdateProps = {
  image: string;
  name: string;
  text?: string;
  action: actionFunction;
  children?: React.ReactNode;
};

function ImageUpdateContainer(props: ImageUpdateProps) {
  const { image, name, text = "update", action, children } = props;
  const [imageFormOpen, setImageFormOpen] = useState(false);

  const userIcon = (
    <LucideUser2 className='h-32 w-32 bg-primary object-cover rounded' />
  );

  return (
    <section>
      <div className='mb-4 md:mb-6'>
        {image ? (
          <Image
            src={image}
            width={500}
            height={500}
            alt={name}
            className='h-32 w-32 object-cover rounded'
          />
        ) : (
          userIcon
        )}
        <Button
          variant='outline'
          onClick={() => setImageFormOpen((value) => !value)}
          className='my-4'
        >
          {text}
        </Button>
        <div>
          {imageFormOpen && (
            <div>
              <FormContainer action={action}>
                {children}
                <ImageInput />
                <SubmitButton size='sm' className='text-sm' />
              </FormContainer>
            </div>
          )}
          <Separator className='mt-4' />
        </div>
      </div>
    </section>
  );
}

export default ImageUpdateContainer;

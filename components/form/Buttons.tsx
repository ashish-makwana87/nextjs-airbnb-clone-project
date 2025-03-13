"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { TbReload } from "react-icons/tb";
import { SignInButton } from "@clerk/nextjs";
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa6";

type btnSize = "sm" | "default" | "lg";

type submitButtonProps = {
  text?: string;
  size?: btnSize;
  className?: string;
};

export const SubmitButton = ({
  size = "lg",
  text = "submit",
  className = "",
}: submitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      size={size}
      className={`capitalize mt-2 text-base ${className}`}
    >
      {pending ? (
        <>
          <TbReload className='mr-2 w-4 h-4 animate-spin' />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
};


export const CardSignInButton = () => {

return <SignInButton mode="modal">
  <Button type="submit" asChild variant='outline' size='icon' className="p-2 cursor-pointer" >
      <FaHeart  />
     </Button>
</SignInButton>
}


export const CardSubmitButton = ({isFavorite}:{isFavorite: boolean}) => {

const {pending} = useFormStatus();

return <Button type="submit" size='icon' variant='outline' className="p-2 cursor-pointer">{pending ? <TbReload className=" animate-spin" /> : isFavorite ? <FaHeart /> : <FaRegHeart />}</Button>
}
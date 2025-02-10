"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { TbReload } from "react-icons/tb";

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


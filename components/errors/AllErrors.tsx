'use client'
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";

function AllErrors({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

const {toast} = useToast()

 useEffect(() => {
 toast({description: error.message})
 }, [])

  return (
    <div>
      <h1 className='head-1'>This is custom error</h1>
      <p>{error.message}</p>
    </div>
  );
}

export default AllErrors;

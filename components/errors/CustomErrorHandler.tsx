"use client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

function CustomErrorHandler({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  const { toast } = useToast();

  useEffect(() => {
    toast({ description: error.message });
  }, []);

  return (
    <div>
      <h1 className='head-1'>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}

export default CustomErrorHandler;

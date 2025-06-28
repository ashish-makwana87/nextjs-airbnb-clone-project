'use client' // Error boundaries must be Client Components
import { useEffect } from 'react';
import CustomErrorHandler from '@/components/errors/CustomErrorHandler'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <CustomErrorHandler error={error} reset={reset} />
    </div>
  )
}
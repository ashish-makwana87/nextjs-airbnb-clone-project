'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import AllErrors from "@/components/errors/AllErrors"

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
      <AllErrors error={error} reset={reset} />
    </div>
  )
}
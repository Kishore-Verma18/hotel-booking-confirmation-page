import { useEffect, useState } from 'react'

export function useBooking() {
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadBooking() {
      try {
        const response = await fetch('/data/booking.json')

        if (!response.ok) {
          throw new Error('Failed to load booking details')
        }

        const data = await response.json()

        if (!cancelled) {
          setBooking(data)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadBooking()

    return () => {
      cancelled = true
    }
  }, [])

  return { booking, error, loading }
}

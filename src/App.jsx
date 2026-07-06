import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import BookingCards from './components/BookingCards'
import InfoCards from './components/InfoCards'
import { useBooking } from './hooks/useBooking'
import { downloadCalendarEvent } from './utils/calendar'

export default function App() {
  const { booking, error, loading } = useBooking()
  const [menuOpen, setMenuOpen] = useState(false)
  const [calendarAdded, setCalendarAdded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    if (menuOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => window.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  const handlePrint = () => {
    window.print()
  }

  const handleAddToCalendar = () => {
    if (!booking) return
    downloadCalendarEvent(booking)
    setCalendarAdded(true)
    window.setTimeout(() => setCalendarAdded(false), 2500)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <p className="font-mono text-sm uppercase tracking-[0.12em] text-neutral-600">Loading your stay…</p>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
        <p className="text-center text-neutral-700">
          Sorry, we couldn&apos;t load your booking details. Please refresh and try again.
        </p>
      </div>
    )
  }

  const { guest, booking: stay } = booking

  return (
    <div className="min-h-screen md:flex">
      <MobileHeader menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} />
      <Sidebar booking={booking} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="main-content" className="flex-1 bg-neutral-50 px-5 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
        <header className="no-print flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.16em] text-neutral-600">
              Booking · {stay.status}
            </p>
            <h1 className="mt-3 font-serif text-[2rem] leading-tight text-neutral-900 md:text-5xl">
              Bienvenue, <span className="text-terracotta-600">{guest.firstName}.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="
                focus-ring rounded-full border border-neutral-900 bg-neutral-0 px-5 py-2.5
                font-serif text-sm text-neutral-900 transition-colors
                hover:bg-neutral-200
                dark:border-neutral-700 dark:bg-neutral-0 dark:hover:bg-neutral-200/20
              "
              aria-label="Print booking receipt"
            >
              Print receipt
            </button>
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="
                focus-ring rounded-full border border-neutral-800 bg-neutral-800 px-5 py-2.5
                font-serif text-sm text-neutral-0 transition-colors
                hover:bg-neutral-700
              "
              aria-label="Download calendar file for your stay"
              aria-live="polite"
            >
              {calendarAdded ? 'Downloaded!' : 'Add to calendar'}
            </button>
          </div>
        </header>

        <div className="mt-8 md:mt-10">
          <BookingCards booking={booking} />
        </div>

        <div className="no-print mt-10 md:mt-14">
          <InfoCards booking={booking} />
        </div>

        <footer className="no-print mt-12 text-center text-[0.6875rem] text-neutral-600">
          Challenge by{' '}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            className="underline underline-offset-2 transition-colors hover:text-terracotta-600 focus-ring rounded-sm"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by Kishore Kumar Verma.
        </footer>
      </main>
    </div>
  )
}

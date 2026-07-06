import { useState } from 'react'
import { copyToClipboard } from '../utils/clipboard'

function InfoCardHeader({ number, label, colorClass, iconSrc, iconBgClass }) {
  return (
    <div className="flex items-start justify-between mt-15 gap-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBgClass}`}
      >
        <img src={iconSrc} alt="" width={24} height={24} />
      </div>
      <div className="text-right">
        <p className={`font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] ${colorClass}`}>
          {label}
        </p>
        <p className={`font-serif text-4xl leading-none ${colorClass}`}>{number}</p>
      </div>
    </div>
  )
}

function ArrivalCard({ arrival }) {
  return (
    <article className="rounded-2xl bg-neutral-0 p-6 shadow-[0_8px_24px_rgba(43,38,32,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
      <InfoCardHeader
        number="01"
        label="Arrival"
        colorClass="text-terracotta-600"
        iconSrc="/assets/images/icon-key.svg"
        iconBgClass="bg-terracotta-600"
      />
      <h3 className="mt-6 font-serif text-xl text-neutral-900">Check-in from {arrival.checkInFrom}</h3>
      <p className="mt-1 text-sm font-medium text-neutral-700">{arrival.dateLabel}</p>
      <p className="mt-4 text-sm leading-relaxed text-neutral-700">{arrival.instructions}</p>
    </article>
  )
}

function WifiCard({ wifi }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(wifi.password)
    if (success) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <article className="rounded-2xl bg-neutral-0 p-6 shadow-[0_8px_24px_rgba(43,38,32,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
      <InfoCardHeader
        number="02"
        label="Wifi"
        colorClass="text-blue-500"
        iconSrc="/assets/images/icon-wifi.svg"
        iconBgClass="bg-blue-500"
      />
      <h3 className="mt-6 font-serif text-xl text-neutral-900">{wifi.network}</h3>
      <p className="mt-1 text-sm text-neutral-700">Password below</p>

      <div className="mt-5 space-y-2 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-50">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-neutral-600">Network</span>
          <span className="font-medium text-neutral-900">{wifi.network}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-neutral-200 pt-2 text-sm">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-neutral-600">Password</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-neutral-900">{wifi.password}</span>
            <button
              type="button"
              onClick={handleCopy}
              className={`
                focus-ring rounded-md border px-2.5 py-1 font-mono text-[0.625rem]
                uppercase tracking-[0.08em] transition-colors
                ${copied
                  ? 'border-terracotta-600 bg-terracotta-600 text-neutral-0'
                  : 'border-neutral-400 bg-neutral-0 text-neutral-700 hover:border-neutral-600 hover:bg-neutral-200'
                }
              `}
              aria-label={copied ? 'Password copied to clipboard' : 'Copy Wi-Fi password to clipboard'}
              aria-live="polite"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function BreakfastCard({ breakfast }) {
  return (
    <article className="rounded-2xl bg-neutral-0 p-6 shadow-[0_8px_24px_rgba(43,38,32,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
      <InfoCardHeader
        number="03"
        label="Breakfast"
        colorClass="text-rose-500"
        iconSrc="/assets/images/icon-breakfast.svg"
        iconBgClass="bg-rose-500"
      />
      <h3 className="mt-6 font-serif text-xl text-neutral-900">Served {breakfast.hours}</h3>
      <p className="mt-1 text-sm font-medium text-neutral-700">{breakfast.location}</p>
      <p className="mt-4 text-sm leading-relaxed text-neutral-700">{breakfast.description}</p>
    </article>
  )
}

export default function InfoCards({ booking }) {
  return (
    <section
      className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Stay information"
    >
      <ArrivalCard arrival={booking.arrival} />
      <WifiCard wifi={booking.wifi} />
      <BreakfastCard breakfast={booking.breakfast} />
    </section>
  )
}

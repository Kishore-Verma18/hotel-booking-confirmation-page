function formatCurrency(amount, currency = 'EUR') {
  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)

  return formatted.replace(/^(\D+)/, '$1 ')
}

function ReceiptCard({ booking, className = '', printId }) {
  const { booking: stay } = booking

  return (
    <article
      id={printId}
      className={`
        receipt-card receipt-paper w-full max-w-88 rounded-2xl p-6
        shadow-[0_12px_40px_rgba(43,38,32,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        md:max-w-[24rem] md:p-7
        ${className}
      `}
      aria-label="Booking receipt"
    >
      <div className="print-only mb-6 hidden border-b border-neutral-200 pb-4">
        <p className="font-serif text-2xl text-neutral-900">{booking.hotel.name}</p>
        <p className="mt-1 text-sm text-neutral-600">{booking.hotel.address}</p>
      </div>

      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-neutral-600">
          Receipt
        </p>
        <div className="text-right font-mono text-[0.625rem] leading-relaxed text-neutral-600">
          <p>№ {stay.receiptNumber}</p>
          <p>{stay.receiptCode}</p>
        </div>
      </div>

      <h2 className="mt-5 font-serif text-2xl text-neutral-900 md:text-[1.75rem]">Your stay</h2>

      <div className="mt-6 grid grid-cols-2 gap-4 border-b border-neutral-200 pb-6">
        <div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-neutral-600">Check in</p>
          <p className="mt-1 font-serif text-3xl leading-none text-neutral-900">{stay.checkIn.displayDate}</p>
          <p className="mt-1 text-sm text-neutral-700">
            {stay.checkIn.dayLabel} · {stay.checkIn.time}
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-neutral-600">Check out</p>
          <p className="mt-1 font-serif text-3xl leading-none text-neutral-900">{stay.checkOut.displayDate}</p>
          <p className="mt-1 text-sm text-neutral-700">
            {stay.checkOut.dayLabel} · {stay.checkOut.time}
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        {stay.lineItems.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4">
            <dt className="text-neutral-700">{item.label}</dt>
            <dd className="shrink-0 font-mono text-neutral-900">
              {formatCurrency(item.amount, stay.currency)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-neutral-200 pt-5">
        <div className="flex items-end justify-between gap-4">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-neutral-600">Total paid</p>
          <p className="font-serif text-3xl text-neutral-900 md:text-4xl">
            {formatCurrency(stay.total, stay.currency)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-neutral-600">
          Paid · {stay.paymentMethod} · {stay.paymentCurrency}
        </p>
        <img src="/assets/images/icon-barcode.svg" alt="" width={93} height={28} />
      </div>
    </article>
  )
}

function WelcomeCard({ booking, className = '' }) {
  const { host, booking: stay } = booking

  return (
    <article
      className={`
        welcome-card w-full max-w-88 rounded-2xl bg-linear-to-br from-terracotta-500 to-terracotta-700
        p-6 text-neutral-0 shadow-[0_16px_48px_rgba(183,65,27,0.35)]
        md:max-w-[24rem] md:p-7
        ${className}
      `}
      aria-label="Welcome note from host"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-neutral-0/75">
          Welcome card
        </p>
        <img src="/assets/images/illustration-sun.svg" alt="" width={48} height={48} className="opacity-90" />
      </div>

      <h2 className="mt-6 font-serif text-[1.625rem] leading-tight md:text-3xl">
        A note from your host, <em className="not-italic">{host.name}.</em>
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-neutral-0/90">{host.message}</p>

      <div className="mt-8 border-t border-neutral-0/20 pt-5">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-neutral-0/70">Room</p>
        <p className="mt-1 font-serif text-2xl">{stay.room}</p>
      </div>
    </article>
  )
}

export default function BookingCards({ booking }) {
  return (
    <section className="relative mx-auto w-full max-w-4xl" aria-label="Booking confirmation cards">
      <div
        className="
          booking-cards-group group relative flex min-h-[30rem] flex-col items-center justify-center
          md:min-h-[32rem]
          lg:min-h-[26rem]
        "
      >
        <WelcomeCard
          booking={booking}
          className="
            relative z-20
            lg:absolute lg:left-[calc(50%-6rem)] lg:top-1/2 lg:-translate-y-1/2
            lg:origin-bottom-left lg:rotate-[6deg]
            lg:transition-[transform] lg:duration-500 lg:ease-[cubic-bezier(0.34,1.56,0.64,1)]
            lg:group-hover:translate-x-10 lg:group-hover:transition-all lg:group-hover:duration-500 lg:group-hover:ease-[cubic-bezier(0.34,1.56,0.64,1)] lg: lg:group-hover:rotate-[14deg]
            motion-reduce:lg:transition-none
          "
        />

        <ReceiptCard
          booking={booking}
          printId="receipt-print"
          className="
            relative z-10 -mt-10 rotate-[2deg]
            lg:absolute lg:left-[calc(50%-15rem)] lg:top-1/2 lg:mt-0 lg:-translate-y-1/2
            lg:origin-bottom-right lg:-rotate-[8deg]
            lg:transition-[transform] lg:duration-500 lg:ease-[cubic-bezier(0.34,1.56,0.64,1)]
            lg:group-hover:-translate-x-10 lg:group-hover:transition-all lg:group-hover:duration-500 lg:group-hover:ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:group-hover:-rotate-[16deg]
            motion-reduce:lg:transition-none
          "
        />
      </div>

      <p className="no-print mt-2 hidden items-center justify-center gap-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.16em] text-neutral-600 lg:flex">
        <img src="/assets/images/icon-sparkle.svg" alt="" width={8} height={8} />
        Hover to fan
        <img src="/assets/images/icon-sparkle.svg" alt="" width={8} height={8} />
      </p>
    </section>
  )
}

export { ReceiptCard }

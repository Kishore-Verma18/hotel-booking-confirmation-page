import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'Your stay', icon: '/assets/images/icon-bed.svg', active: true, badge: true },
  { label: 'The house', icon: '/assets/images/icon-house.svg' },
  { label: 'Around town', icon: '/assets/images/icon-pin.svg' },
  { label: 'Breakfast', icon: '/assets/images/icon-breakfast-outline.svg' },
  { label: 'Messages', icon: '/assets/images/icon-mail.svg' },
]

export default function Sidebar({ booking, isOpen, onClose }) {
  const { hotel, weather, navigation } = booking

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-neutral-900/40 md:hidden"
          aria-label="Close navigation menu"
          onClick={onClose}
        />
      )}

      <div
        className={`
          sidebar-scene no-print
          fixed inset-y-0 left-0 z-50 w-[min(100%,20rem)]
          transition-transform duration-300 ease-in-out
          md:static md:z-auto md:w-64 md:shrink-0 md:transition-none lg:w-72
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'}
        `}
      >
        <aside
          className={`
            sidebar-panel flex h-full flex-col bg-neutral-100 px-6 py-8
          `}
          aria-label="Site navigation"
        >
          <div className="mb-8 flex items-center justify-between md:mb-10">
            <a href="#" className="focus-ring rounded-md">
              <img src="/assets/images/logo.svg" alt={hotel.name} width={107} height={42} />
            </a>
            <button
              type="button"
              className="focus-ring rounded-lg border border-neutral-400 p-2.5 transition-colors hover:bg-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-200/20 md:hidden"
              aria-label="Close menu"
              onClick={onClose}
            >
              <img src="/assets/images/icon-close.svg" alt="" width={20} height={20} className="dark:invert" />
            </button>
          </div>

          <ThemeToggle />

          <nav className="mt-6 flex flex-col gap-1" aria-label="Guest navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`
                  focus-ring group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                  transition-colors
                  ${item.active
                    ? 'bg-neutral-0 text-neutral-900 shadow-sm dark:shadow-neutral-900/20'
                    : 'text-neutral-700 hover:bg-neutral-200/70 focus-visible:bg-neutral-200/70 dark:hover:bg-neutral-200/10 dark:focus-visible:bg-neutral-200/10'
                  }
                `}
                aria-current={item.active ? 'page' : undefined}
                onClick={onClose}
              >
                <img
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0 dark:invert dark:opacity-80"
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && navigation.badgeCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-terracotta-600 text-[0.625rem] font-semibold text-neutral-0">
                    {navigation.badgeCount}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-6 pt-8">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-sun-200 to-sun-500 p-5 shadow-[inset_-6px_-8px_0_rgba(194,90,46,0.18)]">
              <p className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-neutral-800/70">
                Today in {weather.location}
              </p>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-4xl leading-none text-neutral-900">{weather.temperature}°</p>
                  <p className="mt-1 text-sm text-neutral-800">{weather.condition}</p>
                </div>
                <img
                  src="/assets/images/icon-weather.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="shrink-0"
                />
              </div>
            </div>

            <div className="space-y-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-neutral-600">
              <p>Est. {hotel.established}</p>
              <p className="normal-case tracking-normal">{hotel.name} · {hotel.address}</p>
              <p>© {new Date().getFullYear()} {hotel.name}</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

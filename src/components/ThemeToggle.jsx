import { useTheme } from '../context/ThemeContext'

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 49 49" fill="none" aria-hidden="true">
      <g stroke="#c25a2e" strokeWidth="2">
        <path fill="#f5d98a" d="M24.5 33.074a8.575 8.575 0 1 0 0-17.149 8.575 8.575 0 0 0 0 17.15Z" />
        <path strokeLinecap="round" d="M37.975 24.5H44.1m-10.072 9.528 4.331 4.331M24.5 37.975V44.1m-9.529-10.072-4.33 4.331m.384-13.859H4.9m10.071-9.528-4.33-4.331m13.859.384V4.9m9.528 10.072 4.331-4.331" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="#f5d98a"
        d="M21 14.5A7.5 7.5 0 0 1 9.5 3 6 6 0 1 0 21 14.5Z"
        stroke="#c25a2e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="rounded-xl border border-neutral-400/60 bg-neutral-0/50 p-4 dark:border-neutral-600/40 dark:bg-neutral-0/5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-neutral-600">
            Appearance
          </p>
          <p className="mt-0.5 text-sm font-medium text-neutral-900">
            {isDark ? 'Dark mode' : 'Light mode'}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
          className="
            focus-ring relative h-8 w-14 shrink-0 rounded-full
            border border-neutral-400/80 bg-neutral-200
            transition-colors duration-300
            dark:border-neutral-600 dark:bg-neutral-800
          "
        >
          <span
            className={`
              absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center
              rounded-full bg-neutral-0 shadow-md transition-all duration-500
              ease-[cubic-bezier(0.34,1.56,0.64,1)]
              dark:bg-neutral-700 dark:shadow-neutral-900/50
              ${isDark ? 'left-[calc(100%-1.625rem)] scale-105' : 'left-1 scale-100'}
            `}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </span>
        </button>
      </div>

      <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-widest text-neutral-600">
        {isDark ? 'Sidebar · night' : 'Sidebar · day'}
      </p>
    </div>
  )
}

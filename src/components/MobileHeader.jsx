export default function MobileHeader({ menuOpen, onMenuOpen }) {
  return (
    <header className="no-print flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-5 py-4 dark:border-neutral-400/30 md:hidden">
      <a href="#" className="focus-ring rounded-md">
        <img src="/assets/images/logo.svg" alt="Maison Soleil" width={107} height={42} />
      </a>
      <button
        type="button"
        className="focus-ring rounded-lg border border-neutral-400 p-2.5 transition-colors hover:bg-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-200/10"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={onMenuOpen}
      >
        <img src="/assets/images/icon-menu.svg" alt="" width={20} height={20} className="dark:invert dark:opacity-80" />
      </button>
    </header>
  )
}

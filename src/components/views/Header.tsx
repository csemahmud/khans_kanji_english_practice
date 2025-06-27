{/* 🎌 Header with icon and scroll shadow */}
<header
ref={headerRef}
className={clsx(
  'fixed top-0 left-0 w-full z-50 transition-shadow duration-300',
  'bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700',
  scrolled ? 'shadow-md' : 'shadow-none'
)}
>
<h2 className="text-3xl font-semibold text-center py-4 text-gray-800 dark:text-white tracking-wide flex items-center justify-center gap-3">
  <span role="img" aria-label="flag" className="text-3xl">🎌</span>
  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
    Khan's　漢字　English Quiz
  </span>
</h2>
</header>
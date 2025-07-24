import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { QUIZ_TITLE } from '@/models/constants';

interface HeaderProps {
  scrolled: boolean;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(({ scrolled }, headerRef) => {
  return (
    <header
      role="banner"
      ref={headerRef}
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-shadow duration-300',
        'bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700',
        scrolled ? 'shadow-md' : 'shadow-none'
      )}
    >
      <h2
        className={clsx(
          'flex items-center justify-center gap-2',
          'text-center font-semibold text-gray-800 dark:text-white tracking-wide',
          'py-4 sm:py-6 px-2 leading-tight',
          'whitespace-nowrap overflow-hidden text-ellipsis',
          'text-fluid-xl' // ✅ Tailwind's custom clamp() class
        )}
      >
        <span
          role="img"
          aria-hidden="true"
          aria-label="flag"
          className="text-fluid-xl" // ✅ Consistent use of Tailwind custom class
        >
          🎌
        </span>
        <span
          className={clsx(
            'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm',
            'whitespace-nowrap overflow-hidden text-ellipsis'
          )}
        >
          {QUIZ_TITLE}
        </span>
      </h2>
    </header>
  );
});

Header.displayName = 'Header';

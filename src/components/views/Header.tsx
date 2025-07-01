import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { QUIZ_TITLE } from '@/models/constants';

interface HeaderProps {
  scrolled: boolean;
}

// 👇 Forward the ref directly to the <header> element
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
      <h2 className="text-3xl leading-relaxed font-semibold text-center py-6 text-gray-800 dark:text-white tracking-wide flex items-center justify-center gap-3">
        <span role="img" aria-hidden="true" aria-label="flag" className="text-3xl">🎌</span>
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
          {QUIZ_TITLE}
        </span>
      </h2>
    </header>
  );
});

Header.displayName = 'Header'; // Optional: good practice for dev tools
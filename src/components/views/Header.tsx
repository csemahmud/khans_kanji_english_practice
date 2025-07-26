import { forwardRef, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_TITLE } from '@/models/constants';

interface HeaderProps {
  scrolled: boolean;
  scrollProgress: number;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ scrolled, scrollProgress }, headerRef) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect current theme based on Tailwind's class strategy
    useEffect(() => {
      const checkDark = () =>
        setIsDarkMode(document.documentElement.classList.contains('dark'));

      checkDark();

      const observer = new MutationObserver(checkDark);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      return () => observer.disconnect();
    }, []);

    const bgColor = isDarkMode
      ? scrolled
        ? 'rgba(31, 41, 55, 0.9)' // dark slightly transparent
        : '#1f2937' // dark base
      : scrolled
        ? 'rgba(229, 231, 235, 0.9)' // light slightly gray
        : '#ffffff'; // light base

    return (
      <AnimatePresence>
        <motion.header
          ref={headerRef}
          role="banner"
          key="header"
          initial={false}
          animate={{
            y: scrolled ? 0 : -10,
            opacity: 1,
            backgroundColor: bgColor,
            boxShadow: scrolled
              ? '0 2px 10px rgba(0, 0, 0, 0.1)'
              : '0 0px 0px rgba(0, 0, 0, 0)',
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className={clsx(
            'fixed top-0 left-0 w-full z-50',
            'border-b border-gray-300 dark:border-gray-700',
            'transition-colors duration-300'
          )}
        >
          <h2
            className={clsx(
              'flex items-center justify-center gap-2',
              'text-center font-semibold tracking-wide',
              'text-gray-800 dark:text-white',
              'py-4 sm:py-5 px-2',
              'whitespace-nowrap overflow-hidden text-ellipsis',
              'text-fluid-xl'
            )}
          >
            <span
              role="img"
              aria-hidden="true"
              aria-label="flag"
              className="text-fluid-xl"
            >
              🎌
            </span>
            <span
              className={clsx(
                'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
                'drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis'
              )}
            >
              {QUIZ_TITLE}
            </span>
          </h2>

          {/* Animated Gradient Scroll Bar — Visible only when scrolled */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                key="scroll-bar"
                className="h-1 w-full overflow-hidden"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  scaleX: scrollProgress / 100,
                  opacity: 1,
                  transformOrigin: 'left center',
                }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div
                  className="h-full w-full animate-gradient-x"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                    backgroundSize: '300% 100%',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </AnimatePresence>
    );
  }
);

Header.displayName = 'Header';

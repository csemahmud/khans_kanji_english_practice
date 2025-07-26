import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import KanjiTestController from './features/controllers/KanjiTestController';
import { QUIZ_TITLE } from './models/constants/uiText';
import { Footer, Header } from './components/views';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledRatio = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrolled(scrollTop > 10);
      setScrollProgress(scrolledRatio);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>{QUIZ_TITLE}</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <Header scrolled={scrolled} ref={headerRef} scrollProgress={scrollProgress} />

        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 mb-6 sm:mb-8 md:mb-10">
          <KanjiTestController />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;

import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import KanjiTestController from './features/controllers/KanjiTestController';
import { QUIZ_TITLE } from './models/constants/uiText';
import { Footer, Header } from './components/views';
import { useKanjiLoader, useKanjiQuiz } from './hooks';
import { QuestionMode, JLPTLevel } from './models/types/enums';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<QuestionMode>(QuestionMode.JP_TO_EN);
  const [level, setLevel] = useState<JLPTLevel | null>(null);

  const { kanjiList, isLoading, error } = useKanjiLoader(level);

  const {
    questionList,
    qLength,
    currentQuestion,
    currentIndex,
    handleAnswer,
    handleSkip,
    handleNext,
    selectedMeaning,
    selectedReading,
    setSelectedMeaning,
    setSelectedReading,
    showAnswer,
    score,
    quizState,
    remainingTime,
    isTimedUp,
    topViewDivRef,
    resetQuiz,
    handleStartPlay,
    handleFinish,
  } = useKanjiQuiz(kanjiList, mode);

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
        <title>{QUIZ_TITLE} | JLPT N5–N1 Practice</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <Header scrolled={scrolled} ref={headerRef} scrollProgress={scrollProgress} />

        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 mb-6 sm:mb-8 md:mb-10">
          <KanjiTestController 
            mode={mode}
            setMode={setMode}
            level={level}
            setLevel={setLevel}
            isLoading={isLoading}
            error={error}
            questionList={questionList}
            qLength={qLength}
            currentQuestion={currentQuestion}
            currentIndex={currentIndex}
            selectedMeaning={selectedMeaning}
            selectedReading={selectedReading}
            setSelectedMeaning={setSelectedMeaning}
            setSelectedReading={setSelectedReading}
            showAnswer={showAnswer}
            score={score}
            quizState={quizState}
            remainingTime={remainingTime}
            isTimedUp={isTimedUp}
            topViewDivRef={topViewDivRef}
            handleAnswer={handleAnswer}
            handleSkip={handleSkip}
            handleNext={handleNext}
            resetQuiz={resetQuiz}
            handleFinish={handleFinish}
          />
        </main>

        <Footer quizState={quizState} handleStartPlay={handleStartPlay} />
      </div>
    </>
  );
}

export default App;

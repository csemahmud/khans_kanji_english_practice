import React, { useState, useRef } from 'react';
import { Card, IllustratedImageBox } from '@/components/ui';
import { QuizControls, AnswerChoices, AnswerFeedback } from '@/components/views';
import { useKanjiLoader, useKanjiQuiz } from './hooks';
import { QuestionMode, JLPTLevel } from '@/shared/types/enums';
import { clsx } from 'clsx';

const KanjiTest: React.FC = () => {
  const [mode, setMode] = useState<QuestionMode>(QuestionMode.JP_TO_EN);
  const [level, setLevel] = useState<JLPTLevel | null>(null);
  const [scrolled] = useState(false);

  const headerRef = useRef(null);

  const { kanjiList, isLoading, error } = useKanjiLoader(level);

  const {
    qLength,
    currentQuestion,
    currentIndex,
    handleAnswer,
    handleNext,
    selectedMeaning,
    selectedReading,
    setSelectedMeaning,
    setSelectedReading,
    showAnswer,
    score,
    resetQuiz,
  } = useKanjiQuiz(kanjiList, mode);

  if (isLoading)
    return <div className="text-center text-xl mt-8" aria-live="polite">⏳ Loading kanji data...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 mt-8" aria-live="polite">
        ❌ Error loading kanji data: {error.message ?? 'Unknown error'}
      </div>
    );

  if (!kanjiList?.length) {
    return (
      <div className="text-center text-gray-500 mt-8" aria-live="polite">
        📭 No kanji data available. Please check your connection or try again later.
      </div>
    );
  }

  if (!kanjiList || kanjiList.length === 0) {
    return <div aria-live="polite">No kanji data available. Please try again later.</div>;
  }

  if (!currentQuestion) return <div aria-live="polite">⚠️ No current question loaded.</div>;

  if (currentIndex >= kanjiList.length) {
    return <div className="text-center mt-8" aria-live="polite">🎉 Quiz complete! Your score: {score}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* 🌌 Background Texture (very subtle) */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 dark:opacity-10 pointer-events-none z-0" />

      {/* 🌊 Watermark 1: 漢字 */}
      <div className="absolute top-10 left-5 text-[10rem] font-bold text-gray-400 dark:text-gray-600 opacity-10 select-none pointer-events-none">
        漢字
      </div>

      {/* 🌊 Watermark 2: 英語 */}
      <div className="absolute bottom-10 right-5 text-[10rem] font-bold text-gray-400 dark:text-gray-600 opacity-10 select-none pointer-events-none">
        英語
      </div>
      
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

      {/* 📚 Main Body */}
      <main className="pt-28 pb-12 px-4 flex flex-col items-center relative z-10">
        <QuizControls
          mode={mode}
          setMode={setMode}
          level={level}
          setLevel={setLevel}
          currentIndex={currentIndex}
        />

        <div className="questions-container max-w-2xl w-full mx-auto mt-8 space-y-8">
          <Card
            title={`Q${currentIndex + 1}: ${currentQuestion?.prompt}`}
            description="Select Meaning and Reading below"
            footer={
              <AnswerFeedback
                qLength={qLength}
                currentQuestion={currentQuestion}
                currentIndex={currentIndex}
                showAnswer={showAnswer}
                selectedMeaning={selectedMeaning}
                selectedReading={selectedReading}
                correctMeaning={currentQuestion?.answer.meaning.correct}
                correctReading={currentQuestion?.answer.reading.correct}
                onSubmit={() => handleAnswer()}
                onNext={handleNext}
                resetQuiz={resetQuiz}
              />
            }
          >
            <AnswerChoices
              title="Meaning"
              choices={currentQuestion?.answer.meaning.choices}
              selected={selectedMeaning}
              onSelect={setSelectedMeaning}
            />

            <AnswerChoices
              title="Reading"
              choices={currentQuestion?.answer.reading.choices}
              selected={selectedReading}
              onSelect={setSelectedReading}
            />
          </Card>

          {showAnswer && (
            <div className="max-w-md mx-auto">
              <IllustratedImageBox kanjiQuestion={currentQuestion} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default KanjiTest;

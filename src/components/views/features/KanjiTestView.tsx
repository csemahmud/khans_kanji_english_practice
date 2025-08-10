// src/components/views/features/KanjiTestView.tsx
import React from 'react';
import {
  QuizControls,
  BackgroundTexture,
  Watermarks,
} from '@/components/views';
import { QuizState } from '@/models/types/enums';
import type { KanjiTestViewProps } from '@/models/types/interfaces';
import KanjiQuizPlay from './KanjiQuizPlay';
import Welcome from './Welcome';
import { FinalScore } from './FinalScore';

const KanjiTestView: React.FC<KanjiTestViewProps> = ({
  mode,
  setMode,
  level,
  setLevel,
  isLoading,
  error,
  questionList,
  qLength,
  currentQuestion,
  currentIndex,
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
  handleAnswer,
  handleNext,
  handleSkip,
  resetQuiz,
  handleFinish,
}) => {

  // 🔁 Render based on state
  const renderQuizContent = () => {
    switch (quizState) {
      case QuizState.Welcome:
        return <Welcome />;

      case QuizState.Play:
        return (
          <KanjiQuizPlay
            qLength={qLength}
            currentQuestion={currentQuestion!}
            currentIndex={currentIndex}
            selectedMeaning={selectedMeaning}
            selectedReading={selectedReading}
            setSelectedMeaning={setSelectedMeaning}
            setSelectedReading={setSelectedReading}
            showAnswer={showAnswer}
            score={score}
            remainingTime={remainingTime}
            mode={mode}
            topViewDivRef={topViewDivRef}
            handleAnswer={handleAnswer}
            handleNext={handleNext}
            handleSkip={handleSkip}
            resetQuiz={resetQuiz}
            handleFinish={handleFinish}
          />
        );

      case QuizState.Finish:
        return (
          <FinalScore
            score={score}
            resetQuiz={resetQuiz}
            isTimedUp={isTimedUp}
          />
        );

      default:
        return <div className="text-center mt-8">⚠️ Unknown quiz state.</div>;
    }
  };

  // ⏳ Loading / Error / No data
  if (isLoading)
    return <div className="text-center text-xl mt-10" aria-live="polite">⏳ Loading kanji data...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 mt-10" aria-live="polite">
        ❌ Error loading kanji data: {error.message ?? 'Unknown error'}
      </div>
    );

  if (!questionList?.length) {
    return (
      <div className="text-center text-gray-500 mt-10" aria-live="polite">
        📭 No kanji data available. Please check your connection or try again later.
      </div>
    );
  }

  if (!currentQuestion)
    return <div className="text-center mt-10" aria-live="polite">⚠️ No current question loaded.</div>;

  if (currentIndex >= questionList.length) {
    return (
      <div className="text-center mt-10" aria-live="polite">
        🎉 Quiz complete! Your score: {score.currentScore}
      </div>
    );
  }

  // 🌟 Final Render
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white mt-0 sm:mt-6">
      <BackgroundTexture />
      <Watermarks />

      <main className="py-2 sm:py-5 px-3 sm:px-6 md:px-8 flex flex-col items-center gap-4 relative z-10">
        {/* 🎛 Controls above content for better mobile stacking */}
        <div className="w-full max-w-4xl">
          <QuizControls
            mode={mode}
            setMode={setMode}
            level={level}
            setLevel={setLevel}
            currentIndex={currentIndex}
          />
        </div>

        <div className="w-full max-w-4xl flex-1">
          {renderQuizContent()}
        </div>
      </main>
    </div>
  );
};

export default KanjiTestView;

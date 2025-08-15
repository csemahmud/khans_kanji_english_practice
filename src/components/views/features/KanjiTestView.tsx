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

// ✅ Heroicons
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  InboxIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

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
  // 🔁 Render based on quiz state
  const renderQuizContent = () => {
    switch (quizState) {
      case QuizState.Welcome:
        return <Welcome />;

      case QuizState.Play:
        if (!currentQuestion) return null;

        return (
          <KanjiQuizPlay
            qLength={qLength}
            currentQuestion={currentQuestion}
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
        return (
          <div className="flex items-center justify-center gap-2 mt-8 text-yellow-500">
            <ExclamationTriangleIcon className="w-5 h-5" />
            <span>Unknown quiz state.</span>
          </div>
        );
    }
  };

  // ⏳ Loading / Error / Empty / Current Question Checks
  if (isLoading)
    return (
      <div
        className="flex items-center justify-center gap-2 text-xl mt-10 text-blue-500"
        aria-live="polite"
      >
        <ArrowPathIcon className="w-6 h-6 animate-spin" />
        <span>Loading kanji data...</span>
      </div>
    );

  if (error)
    return (
      <div
        className="flex items-center justify-center gap-2 text-red-500 mt-10"
        aria-live="polite"
      >
        <XCircleIcon className="w-5 h-5" />
        <span>
          Error loading kanji data:{' '}
          {typeof error === 'string' ? error : error?.message ?? 'Unknown error'}
        </span>
      </div>
    );

  if (!questionList?.length) {
    return (
      <div
        className="flex items-center justify-center gap-2 text-gray-500 mt-10"
        aria-live="polite"
      >
        <InboxIcon className="w-5 h-5" />
        <span>
          No kanji data available. Please check your connection or try again later.
        </span>
      </div>
    );
  }

  if (!currentQuestion)
    return (
      <div
        className="flex items-center justify-center gap-2 mt-10 text-yellow-500"
        aria-live="polite"
      >
        <ExclamationTriangleIcon className="w-5 h-5" />
        <span>No current question loaded.</span>
      </div>
    );

  if (currentIndex >= questionList.length) {
    return (
      <div
        className="flex items-center justify-center gap-2 mt-10 text-green-500"
        aria-live="polite"
      >
        <TrophyIcon className="w-5 h-5" />
        <span>Quiz complete! Your score: {score.currentScore}</span>
      </div>
    );
  }

  // 🌟 Main Render
  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-900 flex flex-col mt-0 sm:mt-6">
      {/* Background layers */}
      <BackgroundTexture opacity={0.05} />
      <Watermarks opacity={0.05} />

      <main className="flex-1 py-2 sm:py-5 px-3 sm:px-6 md:px-8 flex flex-col items-center gap-4 relative z-10">
        {/* 🎛 Controls above content for better mobile stacking */}
        <div className="w-full max-w-4xl">
          <QuizControls
            mode={mode}
            setMode={setMode}
            level={level}
            setLevel={setLevel}
            currentIndex={currentIndex}
            quizState={quizState}
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

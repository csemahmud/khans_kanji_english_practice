// src/components/views/features/KanjiTestView.tsx
import React from 'react';
import {
  QuizControls,
  BackgroundTexture,
  Watermarks,
  Header,
} from '@/components/views';
import { QuestionMode, JLPTLevel, QuizState } from '@/models/types/enums';
import type { KanjiQuestion, Score } from '@/models/types/interfaces';
import KanjiQuizPlay from './KanjiQuizPlay';
import Welcome from './Welcome';
import { FinalScore } from './FinalScore';

interface KanjiTestViewProps {
  headerRef: React.RefObject<HTMLElement>;
  scrolled: boolean;
  mode: QuestionMode;
  setMode: React.Dispatch<React.SetStateAction<QuestionMode>>;
  level: JLPTLevel | null;
  setLevel: React.Dispatch<React.SetStateAction<JLPTLevel | null>>;
  isLoading: boolean;
  error: Error | null;
  questionList: KanjiQuestion[];
  qLength: number;
  currentQuestion: KanjiQuestion | null;
  currentIndex: number;
  selectedMeaning: string | null;
  selectedReading: string | null;
  setSelectedMeaning: (value: string | null) => void;
  setSelectedReading: (value: string | null) => void;
  showAnswer: boolean;
  score: Score;
  quizState: QuizState;
  remainingTime: number;
  isTimedUp: boolean,
  handleAnswer: () => void;
  handleNext: () => void;
  handleSkip: () => void;
  resetQuiz: () => void;
  handleStartPlay: () => void;
  handleFinish: () => void;
}

const KanjiTestView: React.FC<KanjiTestViewProps> = ({
  headerRef,
  scrolled,
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
  handleAnswer,
  handleNext,
  handleSkip,
  resetQuiz,
  handleStartPlay,
  handleFinish,
}) => {

  // 🔁 Render based on state
  const renderQuizContent = () => {
    switch (quizState) {
      case QuizState.Welcome:
        return <Welcome handleStartPlay={handleStartPlay} />;

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

  if (isLoading)
    return <div className="text-center text-xl mt-8" aria-live="polite">⏳ Loading kanji data...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 mt-8" aria-live="polite">
        ❌ Error loading kanji data: {error.message ?? 'Unknown error'}
      </div>
    );

  if (!questionList?.length) {
    return (
      <div className="text-center text-gray-500 mt-8" aria-live="polite">
        📭 No kanji data available. Please check your connection or try again later.
      </div>
    );
  }

  if (!currentQuestion) return <div aria-live="polite">⚠️ No current question loaded.</div>;

  if (currentIndex >= questionList.length) {
    return <div className="text-center mt-8" aria-live="polite">🎉 Quiz complete! Your score: {score.currentScore}</div>;
  }

  // 🌟 Final Render
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <BackgroundTexture />
      <Watermarks />
      <Header scrolled={scrolled} ref={headerRef} />

      <main className="pt-[72px] pb-12 px-4 flex flex-col items-center relative z-10">
        <QuizControls
          mode={mode}
          setMode={setMode}
          level={level}
          setLevel={setLevel}
          currentIndex={currentIndex}
        />
        {renderQuizContent()}
      </main>
    </div>
  );
};

export default KanjiTestView;

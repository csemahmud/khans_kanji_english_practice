// src/features/controllers/KanjiTestController.tsx
import React from 'react';
import KanjiTestView from '@/components/views/features/KanjiTestView';
import type { KanjiTestViewProps } from '@/models/types/interfaces';

const KanjiTestController: React.FC<KanjiTestViewProps> = ({
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
  
  return (
    <KanjiTestView
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
  );
};

export default KanjiTestController;

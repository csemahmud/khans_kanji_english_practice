// src/features/controllers/KanjiTestController.tsx
import React, { useState } from 'react';
import { useKanjiLoader, useKanjiQuiz } from '@/hooks';
import { QuestionMode, JLPTLevel } from '@/models/types/enums';
import KanjiTestView from '@/components/views/features/KanjiTestView';

const KanjiTestController: React.FC = () => {
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
    resetQuiz,
    handleStartPlay,
    handleFinish,
  } = useKanjiQuiz(kanjiList, mode);

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
      handleAnswer={handleAnswer}
      handleSkip={handleSkip}
      handleNext={handleNext}
      resetQuiz={resetQuiz}
      handleStartPlay={handleStartPlay}
      handleFinish={handleFinish}
    />
  );
};

export default KanjiTestController;

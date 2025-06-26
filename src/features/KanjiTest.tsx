import React, { useState } from 'react';
import { Card, IllustratedImageBox } from '@/components/ui';
import { QuizControls, AnswerChoices, AnswerFeedback } from '@/components/views';
import { useKanjiLoader, useKanjiQuiz } from './hooks';
import { QuestionMode, JLPTLevel } from '@/shared/types/enums';

const KanjiTest: React.FC = () => {
  // 🔼 1. Manage mode and level locally
  const [mode, setMode] = useState<QuestionMode>(QuestionMode.JP_TO_EN);
  const [level, setLevel] = useState<JLPTLevel | null>(null);

  // 🔄 2. useKanjiLoader re-runs when level changes
  const { kanjiList, isLoading, error } = useKanjiLoader(level); // assumes auto-fetch or on-load
  
  // 🔄 3. Pass kanjiList to quiz hook
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
  } = useKanjiQuiz(kanjiList, mode); // Optionally pass mode too if needed

  if (isLoading) return (<div className="text-center text-xl mt-8">⏳ Loading kanji data...</div>);
  if (error) return (
    <div className="text-center text-red-500 mt-8">
      ❌ Error loading kanji data: {error.message ?? 'Unknown error'}
    </div>
  );
  if (!kanjiList || kanjiList.length === 0) {
    return <div>No kanji data available. Please try again later.</div>;
  }
  if (!currentQuestion) return <div>⚠️ No current question loaded.</div>;
  if (currentIndex >= kanjiList.length) {
    return <div className="text-center mt-8">🎉 Quiz complete! Your score: {score}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Khan's　漢字　English Quiz</h2>
      <QuizControls mode={mode} setMode={setMode} level={level} setLevel={setLevel} currentIndex={currentIndex} />
      
      {/*Optional: add some spacing and better alignment*/}
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
      }>
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

          {showAnswer && <div className="max-w-md mx-auto">
              <IllustratedImageBox kanjiQuestion={currentQuestion} />
          </div>}
      </div>
    </div>
    
  );
};

export default KanjiTest;


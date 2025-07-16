import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui';
import { AnswerChoices, AnswerFeedback } from '@/components/views';
import type { KanjiQuestion, Score } from '@/models/types/interfaces';
import type { QuestionMode } from '@/models/types/enums';

interface KanjiQuizPlayProps {
  qLength: number;
  currentQuestion: KanjiQuestion;
  currentIndex: number;
  selectedMeaning: string | null;
  selectedReading: string | null;
  setSelectedMeaning: (value: string | null) => void;
  setSelectedReading: (value: string | null) => void;
  showAnswer: boolean;
  score: Score;
  remainingTime: number;
  mode: QuestionMode;
  handleAnswer: () => void;
  handleNext: () => void;
  handleSkip: () => void;
  resetQuiz: () => void;
  handleFinish: () => void;
}

const KanjiQuizPlay: React.FC<KanjiQuizPlayProps> = ({
  qLength,
  currentQuestion,
  currentIndex,
  selectedMeaning,
  selectedReading,
  setSelectedMeaning,
  setSelectedReading,
  showAnswer,
  score,
  remainingTime,
  mode,
  handleAnswer,
  handleNext,
  handleSkip,
  resetQuiz,
  handleFinish,
}) => {

  // Inside your component
const feedbackRef = useRef<HTMLDivElement>(null); // 🟢 Create the ref

useEffect(() => {
  // This will run on every showAnswer change (like after clicking Next, Reset, or Finish)
  if (showAnswer && feedbackRef.current) {
    feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [showAnswer]); // 🟢 Runs every time showAnswer changes

  return (
    <div className="questions-container max-w-2xl w-full mx-auto mt-8 space-y-8">
      <Card
        title={`Q${currentIndex + 1} of ${qLength}: ${currentQuestion.prompt}`}
        description="Select Meaning then select Reading below"
        variant="answer_choices"
        footer={
          <AnswerFeedback
            qLength={qLength}
            currentQuestion={currentQuestion}
            currentIndex={currentIndex}
            showAnswer={showAnswer}
            selectedMeaning={selectedMeaning}
            selectedReading={selectedReading}
            correctMeaning={currentQuestion.answer.meaning.correct}
            correctReading={currentQuestion.answer.reading.correct}
            score={score}
            remainingTime={remainingTime}
            onSubmit={handleAnswer}
            onNext={handleNext}
            onSkip={handleSkip}
            resetQuiz={resetQuiz}
            handleFinish={handleFinish}
          />
        }
      >{!showAnswer && (
        <div id="answer_card" className="flex flex-col sm:flex-col md:flex-row gap-4 md:space-x-4">
          <AnswerChoices
            title={currentQuestion.prompt}
            choices={currentQuestion.answer.meaning.choices}
            selected={selectedMeaning}
            currentIndex={currentIndex}
            mode={mode}
            onSelect={setSelectedMeaning}
          />
          <AnswerChoices
            title={currentQuestion.prompt}
            choices={currentQuestion.answer.reading.choices}
            selected={selectedReading}
            currentIndex={currentIndex}
            mode={mode}
            variant="Pronunciation"
            onSelect={setSelectedReading}
          />
        </div>)
        }
      </Card>
    </div>
  );
};

export default KanjiQuizPlay;

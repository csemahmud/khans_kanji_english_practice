import React from 'react';
import { Card } from '@/components/ui';
import { AnswerChoices, AnswerFeedback } from '@/components/views';
import type { KanjiQuestion, Score } from '@/models/types/interfaces';

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
  handleAnswer,
  handleNext,
  handleSkip,
  resetQuiz,
  handleFinish,
}) => {
  return (
    <div className="questions-container max-w-2xl w-full mx-auto mt-8 space-y-8">
      <Card
        title={`Q${currentIndex + 1}: ${currentQuestion.prompt}`}
        description="Select Meaning and Reading below"
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
      >
        <div className="flex flex-col sm:flex-col md:flex-row gap-4 md:space-x-4">
          <AnswerChoices
            title="Meaning"
            choices={currentQuestion.answer.meaning.choices}
            selected={selectedMeaning}
            onSelect={setSelectedMeaning}
          />
          <AnswerChoices
            title="Reading"
            choices={currentQuestion.answer.reading.choices}
            selected={selectedReading}
            onSelect={setSelectedReading}
          />
        </div>
      </Card>
    </div>
  );
};

export default KanjiQuizPlay;

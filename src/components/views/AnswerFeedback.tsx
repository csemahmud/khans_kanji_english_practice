import React from 'react';
import { Button } from '@/components/ui';

interface Props {
  showAnswer: boolean;
  selectedMeaning: string | null;
  selectedReading: string | null;
  correctMeaning: string;
  correctReading: string;
  onSubmit: () => void;
  onNext: () => void;
}

export const AnswerFeedback: React.FC<Props> = ({
  showAnswer,
  selectedMeaning,
  selectedReading,
  correctMeaning,
  correctReading,
  onSubmit,
  onNext,
}) => {
  if (showAnswer) {
    return (
      <div className="mt-4 space-y-2">
        <p>{selectedMeaning === correctMeaning ? '✅ Meaning Correct' : '❌ Meaning Wrong'}</p>
        <p>{selectedReading === correctReading ? '✅ Reading Correct' : '❌ Reading Wrong'}</p>
        <Button variant="secondary" onClick={onNext} className="mt-2 w-full">
          Next Question
        </Button>
      </div>
    );
  }

  if (selectedMeaning && selectedReading) {
    return (
      <Button onClick={onSubmit} className="mt-4 w-full">
        Submit Answer
      </Button>
    );
  }

  return null;
};

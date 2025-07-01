import React from 'react';
import { Button } from '@/components/ui';
import type { KanjiQuestion } from '@/models/types/interfaces';

interface Props {
  qLength: number;
  currentQuestion: KanjiQuestion;
  currentIndex: number;
  showAnswer: boolean;
  selectedMeaning: string | null;
  selectedReading: string | null;
  correctMeaning: string;
  correctReading: string;
  onSubmit: () => void;
  onNext: () => void;
  resetQuiz: () => void;
}

export const AnswerFeedback: React.FC<Props> = ({
  qLength,
  currentQuestion,
  currentIndex,
  showAnswer,
  selectedMeaning,
  selectedReading,
  correctMeaning,
  correctReading,
  onSubmit,
  onNext,
  resetQuiz,
}) => {
  if (showAnswer) {
    return (
      <div className="mt-4 space-y-2">
        <p>{selectedMeaning === correctMeaning ? '✅ Meaning Correct' : '❌ Meaning Wrong'}</p>
        <p>{selectedReading === correctReading ? '✅ Reading Correct' : '❌ Reading Wrong'}</p>
        <p className="whitespace-nowrap overflow-x-auto inline-flex items-center gap-x-6">
          <span className="font-bold inline-flex items-center gap-1">
            {currentQuestion.prompt}
          </span>
          <span className="inline-flex items-center gap-1">
            Correct Answer :
          </span>
        </p>
        <p className="whitespace-nowrap overflow-x-auto">
          Meaning: <span className={`font-bold inline-flex items-center gap-1 ${selectedMeaning === correctMeaning ? 'text-green-500' : 'text-red-500'}`}>
            {selectedMeaning === correctMeaning ? '✔️' : '❌'}
            {correctMeaning}
          </span> | Reading: <span className={`font-bold inline-flex items-center gap-1 ${selectedReading === correctReading ? 'text-green-500' : 'text-red-500'}`}>
            {selectedReading === correctReading ? '✔️' : '❌'}
            {correctReading}
          </span>
        </p>
        <div className="flex items-center justify-center space-x-4 mt-2 w-full">
          {(currentIndex === qLength - 1) ? (
            <>
              <Button variant="secondary" className="mt-2 w-full">
                Finish
              </Button>
              <span> | </span>
              <Button variant="secondary" onClick={resetQuiz} className="mt-2 w-full">
                Restart
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={onNext} className="mt-2 w-full">
              Next Question
            </Button>
          )}
        </div>
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

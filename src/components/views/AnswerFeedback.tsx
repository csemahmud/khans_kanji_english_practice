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
  onSkip: () => void;
  resetQuiz: () => void;
}

const getFeedbackLabel = (
  selected: string | null,
  correct: string,
  type: 'Meaning' | 'Reading'
): string => {
  if (selected === null) return `⚠️ ${type} Skipped`;
  if (selected === correct) return `✅ ${type} Correct`;
  return `❌ ${type} Wrong`;
};

const getFeedbackColorClass = (
  selected: string | null,
  correct: string
): string => {
  if (selected === null) return 'bg-blue-600 text-yellow-400 pr-1';
  if (selected === correct) return 'text-green-500';
  return 'text-red-500';
};

const getFeedbackSymbol = (
  selected: string | null,
  correct: string
): string => {
  if (selected === null) return '⚠️ Skipped';
  if (selected === correct) return '✔️';
  return '❌';
};

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
  onSkip,
  resetQuiz,
}) => {
  return (
    <div className="flex flex-col mt-4 w-full">
      {showAnswer ? (
        <>
          <div className="mb-2">
            <p aria-label={`Meaning feedback: ${getFeedbackLabel(selectedMeaning, correctMeaning, 'Meaning')}`}>
              {getFeedbackLabel(selectedMeaning, correctMeaning, 'Meaning')}
            </p>
          </div>
          <div className="mb-2">
            <p aria-label={`Reading feedback: ${getFeedbackLabel(selectedReading, correctReading, 'Reading')}`}>
              {getFeedbackLabel(selectedReading, correctReading, 'Reading')}
            </p>
          </div>
          <div className="mb-2">
            <p aria-label="Correct answer prompt and values" className="whitespace-nowrap overflow-x-auto inline-flex items-center gap-x-6">
              <span className="font-bold inline-flex items-center gap-1">
                {currentQuestion.prompt}
              </span>
              <span className="inline-flex items-center gap-1">
                Correct Answer :
              </span>
            </p>
          </div>
          <div className="mb-2">
            <p className="whitespace-nowrap overflow-x-auto" aria-label="Correct meaning and reading feedback">
              Meaning:{' '}
              <span className={`font-bold inline-flex items-center gap-1 ${getFeedbackColorClass(selectedMeaning, correctMeaning)}`}>
                {getFeedbackSymbol(selectedMeaning, correctMeaning)} {correctMeaning}
              </span>{' '}
              | Reading:{' '}
              <span className={`font-bold inline-flex items-center gap-1 ${getFeedbackColorClass(selectedReading, correctReading)}`}>
                {getFeedbackSymbol(selectedReading, correctReading)} {correctReading}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full">
            {currentIndex === qLength - 1 ? (
              <>
                <Button variant="secondary">Finish</Button>
                <Button variant="secondary" onClick={resetQuiz}>
                  Restart
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={onNext}>
                Next Question
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full">
          <Button onClick={onSkip} variant="secondary">
            Skip
          </Button>
          {selectedMeaning && selectedReading && (
            <Button onClick={onSubmit}>Submit Answer</Button>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, IllustratedImageBox, ScoreBoard, Timer } from '@/components/ui';
import type { KanjiQuestion, Score } from '@/models/types/interfaces';
import { CORRECT_POINT, SKIP_POINT, TIME_LIMIT, WRONG_POINT } from '@/models/constants';

interface Props {
  qLength: number;
  currentQuestion: KanjiQuestion;
  currentIndex: number;
  showAnswer: boolean;
  selectedMeaning: string | null;
  selectedReading: string | null;
  correctMeaning: string;
  correctReading: string;
  score: Score;
  remainingTime: number;
  onSubmit: () => void;
  onNext: () => void;
  onSkip: () => void;
  resetQuiz: () => void;
  handleFinish: () => void;
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

const getFortmattedPointString = (
  point: number
): string => {
  return (point > 0) ? "+" + point : point.toString(); 
};

const getFeedbackColorClass = (
  selected: string | null,
  correct: string
): string => {
  if (selected === null) return 'bg-blue-600 text-yellow-400 pr-1';
  if (selected === correct) return 'text-green-400'; // improved contrast
  return 'text-red-400'; // improved contrast
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
  score,
  remainingTime,
  onSubmit,
  onNext,
  onSkip,
  resetQuiz,
  handleFinish,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6 w-full justify-center px-4">
      <div className="w-full md:max-w-[600px]">
        {showAnswer ? (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            role="region"
            aria-live="polite"
          >
            <Card
              title="Feedback"
              description="Here is your Feedback:"
              footer={
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full">
                  {currentIndex === qLength - 1 ? (
                    <>
                      <Button variant="secondary" onClick={handleFinish}>
                        Finish
                      </Button>
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
              }
              className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-lg font-bold"
            >
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
                    Correct Answer:
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
              <div className="max-w-md mx-auto">
                <IllustratedImageBox kanjiQuestion={currentQuestion} />
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="flex flex-wrap items-start justify-center gap-4 w-full">
            <Button onClick={onSkip} variant="secondary">
              Skip
            </Button>
            {selectedMeaning && selectedReading && (
              <Button onClick={onSubmit}>Submit Answer</Button>
            )}
          </div>
        )}
      </div>

      <motion.div
        key="score"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:max-w-[300px]"
      >
        <Card
          title="Score"
          description={`Correct: ${
            getFortmattedPointString(CORRECT_POINT) 
          }, Wrong: ${
            getFortmattedPointString(WRONG_POINT)
          }, Skip: ${
            getFortmattedPointString(SKIP_POINT)
          }`}
          footer={
            score.currentScore < 0 ? (
              <span className="text-red-400">
                Try to answer carefully. Random guesses are hurting your score.
              </span>
            ) : null
          }
          className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-lg font-bold"
        >
          <Timer timeLeft={remainingTime} totalDuration={TIME_LIMIT} />
          <ScoreBoard
            score={score.currentScore}
            total={score.total}
            correctAnswers={score.correctAnswers}
            wrongAnswers={score.wrongAnswers}
          />
        </Card>
      </motion.div>
    </div>
  );
};

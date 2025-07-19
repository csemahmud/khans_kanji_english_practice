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

const getFeedbackLabel = (selected: string | null, correct: string, type: 'Meaning' | 'Reading') => {
  if (selected === null) return `⚠️ ${type} Skipped`;
  if (selected === correct) return `✅ ${type} Correct`;
  return `❌ ${type} Wrong`;
};

const getFortmattedPointString = (point: number) => (point > 0 ? "+" + point : point.toString());

const getFeedbackColorClass = (selected: string | null, correct: string) => {
  if (selected === null) return 'text-yellow-400';
  if (selected === correct) return 'text-green-400';
  return 'text-red-400';
};

const getFeedbackSymbol = (selected: string | null, correct: string) => {
  if (selected === null) return '⚠️';
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
    <div className="flex flex-col lg:flex-row gap-6 mt-6 w-full px-4 justify-center">
      <div className="w-full lg:max-w-2xl">
        {showAnswer ? (
          <>
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              role="region"
              aria-live="polite"
            >
              <Card
                title="Feedback"
                description="Check your answers below:"
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <div className="space-y-2 text-base sm:text-lg font-medium">
                  <p>{getFeedbackLabel(selectedMeaning, correctMeaning, 'Meaning')}</p>
                  <p>{getFeedbackLabel(selectedReading, correctReading, 'Reading')}</p>
                  <p className="flex items-center flex-wrap gap-x-4">
                    <span className="font-bold">{currentQuestion.prompt}</span>
                    <span className="text-sm opacity-80">Correct Answer:</span>
                  </p>
                  <p className="flex flex-wrap items-center gap-x-6">
                    <span className={`font-bold ${getFeedbackColorClass(selectedMeaning, correctMeaning)}`}>
                      {getFeedbackSymbol(selectedMeaning, correctMeaning)} {correctMeaning}
                    </span>
                    <span className={`font-bold ${getFeedbackColorClass(selectedReading, correctReading)}`}>
                      {getFeedbackSymbol(selectedReading, correctReading)} {correctReading}
                    </span>
                  </p>
                </div>
                <div className="mt-4 max-w-sm mx-auto">
                  <IllustratedImageBox kanjiQuestion={currentQuestion} />
                </div>
              </Card>
            </motion.div>

            <motion.div
              key="action1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              role="region"
              aria-live="polite"
              className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-white dark:bg-gray-900 border-t shadow-md flex flex-wrap justify-center gap-4 w-full"
            >
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
            </motion.div>
          </>
        ) : (
          <motion.div
            key="action2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            role="region"
            aria-live="polite"
            className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-white dark:bg-gray-900 border-t shadow-md flex flex-wrap justify-center gap-4 w-full"
          >
            <Button onClick={onSkip} variant="secondary">
              Skip
            </Button>
            {selectedMeaning && selectedReading && (
              <Button onClick={onSubmit}>Submit Answer</Button>
            )}
          </motion.div>
        )}
      </div>

      <motion.div
        key="score"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:max-w-sm"
      >
        <Card
          title="Score"
          description={`Correct: ${getFortmattedPointString(CORRECT_POINT)}, Wrong: ${getFortmattedPointString(WRONG_POINT)}, Skip: ${getFortmattedPointString(SKIP_POINT)}`}
          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          footer={
            score.currentScore < 0 ? (
              <span className="text-sm text-red-400">
                Try to answer carefully. Random guesses are hurting your score.
              </span>
            ) : null
          }
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

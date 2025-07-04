import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, ScoreBoard } from '@/components/ui';
import type { Score } from '@/models/types/interfaces';
import { CORRECT_POINT } from '@/models/constants';

interface Props {
  score: Score;
  resetQuiz: () => void;
}

export const FinalScore: React.FC<Props> = ({
  score,
  resetQuiz,
}) => {

  const percentage = Math.round((score.currentScore / (score.total * CORRECT_POINT)) * 100);

  let message = '';
  let emoji = '';

  if (percentage >= 90) {
    message = "Excellent! You're mastering these Kanji!";
    emoji = '🎉🔥';
  } else if (percentage >= 70) {
    message = 'Good job! Keep up the great work.';
    emoji = '👏😊';
  } else if (percentage >= 50) {
    message = "You're getting there! Keep practicing.";
    emoji = '💪📖';
  } else {
    message = "Don't worry! Practice makes perfect.";
    emoji = '🙌✨';
  }

  return (
    <motion.div
      key="final-score-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row gap-6 mt-6 w-full justify-center px-4"
    >
      <motion.div
        key="score"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:max-w-[300px]"
      >
        <Card
          title="🎌 Thank you for attending the Kanji Quiz!"
          description="📊 Here is your final score"
          variant="answer_choices"
          footer={
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full">
              <p className="text-sm text-gray-700 dark:text-gray-300">Feel free to try again anytime! 🔁</p>
              <Button variant="secondary" onClick={resetQuiz}>
                🔄 Try Again
              </Button>
            </div>
          }
          className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-lg font-bold"
        >
          <ScoreBoard
            score={score.currentScore}
            total={score.total}
            correctAnswers={score.correctAnswers}
            wrongAnswers={score.wrongAnswers}
          />
          <div className="mt-4 text-center">
            <p className="text-xl">
              🏁 Score: <span className="font-bold">{percentage}%</span>
            </p>
            <p className="italic text-sm text-gray-700 dark:text-gray-300 mt-2">
              {emoji} {message}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

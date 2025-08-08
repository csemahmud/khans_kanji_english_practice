import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, ScoreBoard } from '@/components/ui';
import type { Score } from '@/models/types/interfaces';
import { CORRECT_POINT, QUIZ_TITLE } from '@/models/constants';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

interface Props {
  score: Score;
  isTimedUp: boolean;
  resetQuiz: () => void;
}

export const FinalScore: React.FC<Props> = ({
  score,
  isTimedUp,
  resetQuiz,
}) => {

  useEffect(() => {
    if (isTimedUp) {
      Swal.fire({
        title: "Timed Out",
        text: "Sorry, Quiz Time Has Finished !!!",
        icon: 'error',
        confirmButtonText: "OK",
        background: '#1f2937', // dark gray background
        color: '#f3f4f6', // light text
        customClass: {
          confirmButton: 'px-4 py-2 bg-red-600 text-white rounded',
        },
      });
    }
  }, [isTimedUp]);

  const percentage = (score.total !== 0) ? Math.min(
    100,
    Math.round((score.currentScore / (score.total * CORRECT_POINT)) * 100)
  ) : 0;

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
      {/* ✅ Meta Tags */}
      <Helmet>
        <title>{QUIZ_TITLE} | Finish</title>
        <meta name="description" content="Test your Japanese Kanji knowledge with this interactive quiz app. Supports JLPT N5 to N1 levels." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        <meta property="og:title" content={QUIZ_TITLE} />
        <meta property="og:description" content="Master Kanji with fun, fast-paced quizzes! Designed for learners at all JLPT levels." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/screenshots/app_demo_kanji.png" />
      </Helmet>

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
          <div className="mt-4 text-center" role="alert">
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

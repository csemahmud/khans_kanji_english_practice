import React from "react";
import { motion } from "framer-motion";
import { CORRECT_POINT } from "@/models/constants";

interface ScoreBoardProps {
  score: number;
  total: number;
  correctAnswers: number;
  wrongAnswers: number;
  className?: string;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  total,
  correctAnswers,
  wrongAnswers,
  className = "",
}) => {
  const maxScore = total * CORRECT_POINT;
  const percentage = total > 0 ? (score / maxScore) * 100 : 0;

  return (
    <motion.div
      role="region"
      aria-label="Score summary"
      className={`bg-gray-900 text-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2
        className="text-xl font-semibold text-blue-400 mb-5 text-center"
        tabIndex={0}
      >
        Your Score Summary
      </h2>

      {/* Score bar */}
      <div className="mb-5">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Score</span>
          <span>{score} / {maxScore}</span>
        </div>
        <div
          className="w-full h-4 bg-gray-700 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <motion.div
            className="h-full bg-blue-500"
            style={{ width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Correct / Wrong answers */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div
          className="bg-gray-800 rounded-xl p-4 text-center"
          role="group"
          aria-label={`${correctAnswers} correct answers`}
        >
          <p className="text-green-400 font-bold text-xl">{correctAnswers}</p>
          <p className="text-gray-300" aria-hidden="true">✔️</p>
          <span className="sr-only">Correct answers</span>
        </div>
        <div
          className="bg-gray-800 rounded-xl p-4 text-center"
          role="group"
          aria-label={`${wrongAnswers} wrong answers`}
        >
          <p className="text-red-400 font-bold text-xl">{wrongAnswers}</p>
          <p className="text-gray-300" aria-hidden="true">❌</p>
          <span className="sr-only">Wrong answers</span>
        </div>
      </div>
    </motion.div>
  );
};

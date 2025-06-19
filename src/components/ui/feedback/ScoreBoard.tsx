import React from "react";
import { motion } from "framer-motion";

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
  const percentage = (score / total) * 100;

  return (
    <motion.div
      className={`bg-gray-800 text-white rounded-2xl shadow-lg p-6 w-full max-w-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold text-blue-400 mb-4 text-center">
        Your Score Summary
      </h2>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Score</span>
          <span>{score} / {total}</span>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            style={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div className="bg-gray-700 rounded-xl p-3 text-center">
          <p className="text-green-400 font-bold text-lg">{correctAnswers}</p>
          <p className="text-gray-300">Correct</p>
        </div>
        <div className="bg-gray-700 rounded-xl p-3 text-center">
          <p className="text-red-400 font-bold text-lg">{wrongAnswers}</p>
          <p className="text-gray-300">Wrong</p>
        </div>
      </div>
    </motion.div>
  );
};

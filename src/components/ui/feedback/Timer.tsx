// Timer.tsx (Refactored View-only)
import React from "react";
import { motion } from "framer-motion";

interface TimerProps {
  timeLeft: number; // receives from parent
  totalDuration: number;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, totalDuration, className = "" }) => {
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const percent = (timeLeft / totalDuration) * 100;

  return (
    <motion.div
      className={`relative w-full max-w-xs mx-auto bg-gray-800 dark:bg-gray-900 text-white rounded-xl shadow-md p-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-2 font-semibold text-lg">
        ⏱️ Time Left
      </div>

      <div className="relative w-full h-3 rounded-full bg-gray-600 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-center mt-2 text-2xl font-bold text-green-400">
        {formatTime(timeLeft)}
      </div>
    </motion.div>
  );
};

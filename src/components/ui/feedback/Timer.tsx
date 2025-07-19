import React from "react";
import { motion } from "framer-motion";

interface TimerProps {
  timeLeft: number;
  totalDuration: number;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  totalDuration,
  className = "",
}) => {
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const percent = totalDuration > 0 ? (timeLeft / totalDuration) * 100 : 0;

  return (
    <motion.div
      role="timer"
      aria-label={`Timer showing ${formatTime(timeLeft)} remaining`}
      className={`bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-sm mx-auto p-5 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center text-lg font-semibold text-blue-400 mb-3">
        ⏱️ Time Remaining
      </div>

      <div
        className="relative w-full h-4 rounded-full bg-gray-700 overflow-hidden"
        aria-label={`Progress bar with ${percent.toFixed(1)}% time left`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-green-400"
          style={{ width: `${percent}%` }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="mt-3 text-center text-3xl font-bold text-green-400 tracking-widest">
        {formatTime(timeLeft)}
      </div>
    </motion.div>
  );
};

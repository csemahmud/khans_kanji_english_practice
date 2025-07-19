import React from "react";
import { motion } from "framer-motion";
import type { KanjiQuestion } from "@/models/types/interfaces";

interface IllustratedImageBoxProps {
  kanjiQuestion: KanjiQuestion;
  className?: string;
}

export const IllustratedImageBox: React.FC<IllustratedImageBoxProps> = ({
  kanjiQuestion,
  className = "",
}) => {
  if (!kanjiQuestion.imageUrl || kanjiQuestion.imageUrl.trim() === "") return null;

  return (
    <motion.div
      role="region"
      aria-label={`Illustration of kanji ${kanjiQuestion.prompt}`}
      className={`bg-gray-900 text-white border border-gray-700 rounded-2xl shadow-md p-4 w-full max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm mb-3 font-semibold text-center sm:text-left">
        Illustration for:{" "}
        <span className="text-green-400 text-lg">{kanjiQuestion.prompt}</span>
      </div>

      <div className="w-full aspect-video bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={kanjiQuestion.imageUrl}
          alt={`Kanji Illustration - ${kanjiQuestion.prompt}`}
          className="object-contain w-full max-h-full"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

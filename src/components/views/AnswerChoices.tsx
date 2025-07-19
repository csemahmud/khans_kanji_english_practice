import React from "react";
import { QuestionMode } from "@/models/types/enums";

interface Props {
  title: string;
  choices: string[];
  selected: string | null;
  currentIndex: number;
  mode: QuestionMode;
  variant?: "Meaning" | "Pronunciation";
  onSelect: (choice: string) => void;
}

export const AnswerChoices: React.FC<Props> = ({
  title,
  choices,
  selected,
  variant = "Meaning",
  onSelect,
}) => {
  const labelText =
    variant === "Pronunciation" ? "Select the pronunciation:" : "Select the meaning:";

  return (
    <div className="w-full space-y-4 text-center">
      {/* Label */}
      <p className="text-sm font-semibold text-gray-300">{labelText}</p>

      {/* Optional Kanji Title */}
      {variant === "Meaning" && (
        <div className="text-6xl font-bold text-gray-100 tracking-wide">
          {title}
        </div>
      )}

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {choices.map((choice) => {
          const isSelected = selected === choice;
          return (
            <button
              key={choice}
              onClick={() => onSelect(choice)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 focus:outline-none
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:border-blue-400"
                }`}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
};

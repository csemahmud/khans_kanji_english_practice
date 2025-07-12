import React from "react";
import { RadioList } from "@/components/ui";
import { QuestionMode } from "@/models/types/enums";

interface Props {
  title: string;
  choices: string[];
  selected: string | null;
  currentIndex: number;
  mode: QuestionMode;
  variant?: "Meaning" | "Reading";
  onSelect: (choice: string) => void;
}

export const AnswerChoices: React.FC<Props> = ({ 
  title, 
  choices, 
  selected, 
  currentIndex,
  mode, 
  variant = "Meaning",
  onSelect 
}) => {
  const options = choices.map((choice) => ({
    label: choice,
    value: choice,
  }));

  return (
    <div className="w-full max-w-xl mx-auto bg-gray-900 rounded-lg p-6 shadow-md">
      <span className="text-base font-semibold text-gray-100 mb-2 tracking-wide drop-shadow-sm">
      {`Q${currentIndex + 1}(${
        (variant === "Meaning") ? 
        "a":"b"
        }): What is the ${variant + ((variant === "Reading") ? "(Hiragaina)":"")} of this ${
          (mode === QuestionMode.JP_TO_EN) ? "Kanji" : "Word"
        } ?`}
      </span>
      <h1 className="text-7xl font-bold text-blue-900 bg-yellow-100 mb-2 pb-3 tracking-wide drop-shadow-sm">
        {title}
      </h1>

      <RadioList
        label={ variant + ((variant === "Reading") ? "(Hiragaina)":"")}
        name={`answer-choice-${variant}`}
        options={options}
        selectedValue={selected || ""}
        onChange={onSelect}
        className="mt-3"
      />
    </div>
  );
};

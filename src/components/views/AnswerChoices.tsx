// src/components/views/AnswerChoices.tsx

import React from "react";
import { RadioList } from "@/components/ui";

interface Props {
  title: string;
  choices: string[];
  selected: string | null;
  onSelect: (choice: string) => void;
}

export const AnswerChoices: React.FC<Props> = ({ title, choices, selected, onSelect }) => {
  const options = choices.map((choice) => ({
    label: choice,
    value: choice,
  }));

  return (
    <div className="my-4 w-full max-w-xl mx-auto">
      <h4 className="text-sm text-gray-300 mb-2">{title}</h4>
      <RadioList
        name={"answer-choice-"+title}
        options={options}
        selectedValue={selected || ""}
        onChange={onSelect}
      />
    </div>
  );
};

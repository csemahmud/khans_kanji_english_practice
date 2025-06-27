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
    <div className="w-full max-w-xl mx-auto bg-gray-900 rounded-lg p-6 shadow-md">
      <h4 className="text-base font-semibold text-gray-100 mb-2 tracking-wide drop-shadow-sm">
        {title}
      </h4>

      <RadioList
        label={ "Select : " + title}
        name={`answer-choice-${title}`}
        options={options}
        selectedValue={selected || ""}
        onChange={onSelect}
        className="mt-3"
      />
    </div>
  );
};

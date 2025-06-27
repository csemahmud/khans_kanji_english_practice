import React from "react";
import { motion } from "framer-motion";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioListProps {
  label?: string;
  name: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioList: React.FC<RadioListProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  className = "",
}) => {
  return (
    <div className={`w-full max-w-md ${className}`}>
      {label && (
        <label className="block mb-2 text-gray-300 text-base font-semibold tracking-wide drop-shadow-sm">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          const isSelected = selectedValue === option.value;
          return (
            <motion.label
              key={option.value}
              htmlFor={inputId}
              role="radio"
              aria-checked={isSelected}
              whileHover={{ scale: 1.01 }}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex items-center px-4 py-2 rounded-lg border cursor-pointer transition
                ${isSelected
                  ? "bg-blue-600/30 border-blue-400 text-white"
                  : "bg-gray-800 border-gray-700 text-white  hover:bg-blue-600/20 hover:border-blue-400"}
                ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <input
                id={inputId}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
                className="form-radio text-blue-500 focus:ring-0 mr-3"
              />
              <span className="text-sm">{option.label}</span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );
};

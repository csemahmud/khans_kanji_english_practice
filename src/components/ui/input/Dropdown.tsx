import React from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type Option = {
  value: string | number | null;
  label: string;
};

interface DropdownProps {
  label?: string;
  options: Option[];
  selected: string | number | null;
  onChange: (value: string | number | null) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onChange,
  className = "",
}) => {
  return (
    <div className={`w-full max-w-xs ${className}`}>
      {label && <label className="block mb-1 text-sm text-gray-300">{label}</label>}
      <div className="relative">
        <motion.select
          value={selected === null ? "" : selected}
          onChange={(e) => {
            const value = e.target.value === "" ? null : e.target.value;
            onChange(value);
          }}
          className="appearance-none w-full bg-gray-800 text-white text-sm py-2 pl-3 pr-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value === null ? "" : opt.value}>
              {opt.label}
            </option>
          ))}
        </motion.select>
        <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

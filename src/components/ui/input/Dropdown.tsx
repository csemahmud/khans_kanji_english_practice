import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useId } from "react";

export type Option<T extends string | number | null> = {
  value: T;
  label: string;
};

interface DropdownProps<T extends string | number | null> {
  label?: string;
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
  name?: string;        // ✅ form integration
  id?: string;          // ✅ accessibility
}


export const Dropdown = <T extends string | number | null>({
  label,
  options,
  selected,
  onChange,
  className = "",
  name,
  id,
}: DropdownProps<T>) =>  {
  const internalId = useId(); // fallback if no `id` provided
  const selectId = id || internalId;

  return (
    <div className={`w-full max-w-xs ${className}`}>
      {label && <label htmlFor={selectId} className="block mb-1 text-sm text-gray-300">{label}</label>}
      <div className="relative">
        <motion.select
          id={selectId}
          name={name}
          value={selected === null ? "" : selected}
          onChange={(e) => {
            const value = e.target.value === "" ? null : e.target.value;
            onChange(value as T); // cast safely
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

import { useId, type ReactNode, isValidElement } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export type Option<T extends string | number | null> = {
  value: T;
  label: ReactNode;       // Original JSX or string label
  stringLabel?: string;   // Optional fallback for JSX-based labels
};

interface DropdownProps<T extends string | number | null> {
  label?: string;
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
  name?: string;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export const Dropdown = <T extends string | number | null>({
  label,
  options,
  selected,
  onChange,
  className = "",
  name,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: DropdownProps<T>) => {
  const internalId = useId();
  const selectId = id || internalId;

  const getOptionLabel = (opt: Option<T>) => {
    if (typeof opt.label === "string") return opt.label;
    if (opt.stringLabel) return opt.stringLabel;
    return String(opt.value ?? "--SELECT--"); // fallback
  };

  return (
    <div className={`w-full max-w-xs ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block mb-1 text-gray-700 dark:text-gray-300 text-base font-semibold tracking-wide drop-shadow-sm"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <motion.select
          id={selectId}
          name={name}
          value={selected === null ? "" : selected}
          onChange={(e) => {
            const value = e.target.value === "" ? null : e.target.value;
            onChange(value as T);
          }}
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedBy}
          className="appearance-none w-full bg-gray-800 text-white text-sm py-2 pl-3 pr-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          {options.map((opt) => (
            <option
              key={String(opt.value)}
              value={opt.value === null ? "" : opt.value}
              className={opt.value === null ? "text-gray-400" : ""}
            >
              {getOptionLabel(opt)}
            </option>
          ))}
        </motion.select>

        <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {ariaDescribedBy && (
        <p id={ariaDescribedBy} className="sr-only">
          {ariaDescribedBy}
        </p>
      )}
    </div>
  );
};

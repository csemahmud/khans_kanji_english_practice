import { useId, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export type Option<T extends string | number | null> = {
  value: T;
  label: ReactNode;
  stringLabel?: string;
};

interface DropdownProps<T extends string | number | null> {
  label?: React.ReactNode;
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
    return String(opt.value ?? "--SELECT--");
  };

  return (
    <div className={`w-full max-w-sm ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block mb-2 text-gray-700 text-sm font-semibold"
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
          aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
          aria-describedby={ariaDescribedBy}
          className="appearance-none w-full bg-gray-800 text-white text-sm sm:text-base px-4 py-3 pr-10 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          whileHover={{ scale: 1.01 }}
          whileFocus={{ scale: 1.01 }}
        >
          {options.map((opt) => (
            <option
              key={String(opt.value)}
              value={opt.value === null ? "" : opt.value}
              className={`text-sm sm:text-base ${
                opt.value === null ? "text-gray-400" : "text-white"
              }`}
            >
              {getOptionLabel(opt)}
            </option>
          ))}
        </motion.select>

        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {ariaDescribedBy && (
        <p id={ariaDescribedBy} className="sr-only">
          {ariaDescribedBy}
        </p>
      )}
    </div>
  );
};

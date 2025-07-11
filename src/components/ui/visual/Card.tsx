import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: "default" | "answer_choices" | "dark";
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  className = "",
  variant = "default",
}) => {
  const baseStyles =
    "rounded-2xl shadow-md p-6 w-full";

  const variantStyles = {
    default: "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800",
    answer_choices: "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800",
    dark: "bg-gray-800 text-white border border-gray-700",
  };

  const widthClass =
    ((variant === "answer_choices")||(variant === "dark")) ? "md:max-w-3xl" : "max-w-md";

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Fixed height wrapper for title + description */}
      <div className="mb-4 min-h-[72px] md:min-h-[64px] sm:min-h-[56px] flex flex-col justify-start">
        <h3 className={`text-lg font-semibold ${(variant === "dark") ? "text-white" : "text-gray-900"}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm ${(variant === "dark") ? "text-gray-300" : "text-gray-900"} mt-1 leading-snug`}>
            {description}
          </p>
        )}
      </div>

      {children && <div className="mb-4">{children}</div>}

      {footer && (
        <div className="border-t border-gray-700 pt-3">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

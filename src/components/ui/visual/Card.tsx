import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: "default" | "answer_choices" | "dark" | "correct" | "incorrect";
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
    "rounded-2xl p-6 w-full border shadow transition-all duration-300";

  const variantStyles: Record<string, string> = {
    default: "bg-white text-gray-900 border-gray-200",
    answer_choices: "bg-white text-gray-900 border-gray-200",
    dark: "bg-gray-900 text-gray-100 border-gray-700",
    correct: "bg-green-900 text-green-100 border-green-600",
    incorrect: "bg-red-900 text-red-100 border-red-600",
  };

  const iconMap: Record<string, JSX.Element> = {
    correct: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
    incorrect: <ExclamationCircleIcon className="h-6 w-6 text-red-400" />,
    default: <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
    answer_choices: <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
    dark: <InformationCircleIcon className="h-6 w-6 text-yellow-400" />,
  };

  const footerBorderColor =
    variant === "dark" || variant === "correct" || variant === "incorrect"
      ? "border-gray-700"
      : "border-gray-200";

  const widthClass =
    variant === "answer_choices" || variant === "dark" || variant === "correct" || variant === "incorrect"
      ? "max-w-[95%] sm:max-w-2xl md:max-w-3xl"
      : "max-w-md";

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className} mx-auto`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon Header */}
      <div className="flex items-center gap-3 mb-4">
        <div>{iconMap[variant]}</div>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold leading-tight">
            {title}
          </h3>
          {description && (
            <p
              className={`text-sm mt-1 ${
                variant === "dark" ||
                variant === "correct" ||
                variant === "incorrect"
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      {children && <div className="mb-4">{children}</div>}

      {/* Footer */}
      {footer && (
        <div className={`pt-4 border-t ${footerBorderColor}`}>{footer}</div>
      )}
    </motion.div>
  );
};

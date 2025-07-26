import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface CardProps {
  title?: string;
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
    correct: (
      <CheckCircleIcon
        className="h-6 w-6 text-green-400"
        aria-hidden="true"
        role="presentation"
      />
    ),
    incorrect: (
      <ExclamationCircleIcon
        className="h-6 w-6 text-red-400"
        aria-hidden="true"
        role="presentation"
      />
    ),
    default: (
      <InformationCircleIcon
        className="h-6 w-6 text-blue-400"
        aria-hidden="true"
        role="presentation"
      />
    ),
    answer_choices: (
      <InformationCircleIcon
        className="h-6 w-6 text-blue-400"
        aria-hidden="true"
        role="presentation"
      />
    ),
    dark: (
      <InformationCircleIcon
        className="h-6 w-6 text-yellow-400"
        aria-hidden="true"
        role="presentation"
      />
    ),
  };

  const footerBorderColor =
    variant === "dark" || variant === "correct" || variant === "incorrect"
      ? "border-gray-700"
      : "border-gray-200";

  const widthClass =
    variant === "answer_choices" || variant === "dark" || variant === "correct" || variant === "incorrect"
      ? "max-w-[95%] sm:max-w-2xl md:max-w-3xl"
      : "max-w-md";

  const titleId = title ? `card-title-${Math.random().toString(36).substr(2, 9)}` : undefined;

  return (
    <motion.article
      role="region"
      aria-labelledby={title ? titleId : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className} mx-auto`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      {title && (
        <header
          className="flex items-center gap-3 mb-4"
          aria-label="Card header"
        >
          <div>{iconMap[variant]}</div>
          <div>
            <h3
              id={titleId}
              className="text-lg sm:text-xl font-semibold leading-tight"
            >
              {title}
            </h3>
            {description && (
              <p
                className={`text-sm mt-1 break-words ${
                  variant === "dark" || variant === "correct" || variant === "incorrect"
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        </header>
      )}

      {/* Body */}
      {children && (
        <section aria-label="Card content" className="mb-4">
          {children}
        </section>
      )}

      {/* Footer */}
      {footer && (
        <footer
          className={`pt-4 border-t ${footerBorderColor}`}
          aria-label="Card footer"
        >
          <div className="text-sm sm:text-base break-words">{footer}</div>
        </footer>
      )}
    </motion.article>
  );
};

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  className = "",
}) => {
  return (
    <motion.div
      className={`bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl shadow-md p-6 w-full max-w-md ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {description}
          </p>
        )}
      </div>

      {children && <div className="mb-4">{children}</div>}

      {footer && <div className="border-t border-gray-300 dark:border-gray-700 pt-3">{footer}</div>}
    </motion.div>
  );
};

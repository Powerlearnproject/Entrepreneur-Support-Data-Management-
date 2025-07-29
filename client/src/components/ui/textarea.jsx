// src/components/ui/textarea.jsx
import React from "react";

export const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

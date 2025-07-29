// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, className = "", variant = "solid", size = "md", ...props }) => {
  const baseStyles = "rounded-md font-medium focus:outline-none transition";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

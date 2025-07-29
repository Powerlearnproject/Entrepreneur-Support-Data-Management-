// src/components/ui/card.jsx
import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-xl bg-white shadow p-4 ${className}`}>
      {children}
    </div>
  );
};

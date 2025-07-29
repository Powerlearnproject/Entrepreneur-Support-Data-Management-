// src/components/ui/tabs.jsx
import React, { useState } from "react";

export const Tabs = ({ defaultValue, children }) => {
  const [active, setActive] = useState(defaultValue);
  const cloned = React.Children.map(children, (child) => {
    if (child.type === TabsList) {
      return React.cloneElement(child, { active, setActive });
    }
    if (child.type === TabsContent && child.props.value === active) {
      return child;
    }
    return null;
  });
  return <div>{cloned}</div>;
};

export const TabsList = ({ children, active, setActive, className = "" }) => {
  return (
    <div className={`flex gap-2 border-b mb-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
};

export const TabsTrigger = ({ value, children, active, setActive }) => {
  const isActive = value === active;
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-4 py-2 rounded-t-md text-sm font-medium ${
        isActive ? "bg-white border-t-2 border-x border-blue-500" : "bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }) => {
  return <div>{children}</div>;
};

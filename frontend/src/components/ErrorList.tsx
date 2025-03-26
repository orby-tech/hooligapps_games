import React from "react";

interface ErrorListProps {
  error: Record<string, string[]>;
}

const ErrorList: React.FC<ErrorListProps> = ({ error }) => {
  if (!error || Object.keys(error).length === 0) {
    return null;
  }

  return (
    <div className="error-list">
      <ul>
        {Object.entries(error).map(([field, msgs]) => (
          <li key={field}>
            {field}: {msgs.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorList;

import React from 'react';

interface AlertProps {
    message: string;
    type: string; // Assuming type can only be 'success' or 'error'
  }

  const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const alertClasses = `px-4 py-2 rounded ${
    type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
  }`;

  return (
    <div className={alertClasses}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;

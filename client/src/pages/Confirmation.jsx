// src/pages/Confirmation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // optional: nice confirmation icon

const Confirmation = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard'); // placeholder route, we’ll build it soon
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">You're All Set!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for sharing your information. Let’s help you become HEVA Ready.
      </p>
      <button
        onClick={handleContinue}
        className="bg-blue-600 hover:bg-blue-700 text-blue-600 font-semibold py-3 px-6 rounded-xl shadow-md transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Confirmation;

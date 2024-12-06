import React, { useState } from "react";
import { User } from 'lucide-react';

const ButtonWithSquare: React.FC = () => {
  const [showSquare, setShowSquare] = useState(false);

  const handleClick = () => {
    setShowSquare(!showSquare); // Toggle the square's visibility
  };

  return (
    <div className="flex flex-col items-center space-4 relative">
      <button
        onClick={handleClick}
        className="p-2 rounded-full hover:bg-emerald-800"
      >
        <User className="h-5 w-5" />
      </button>

      {/* The square will be positioned absolutely, with updated width */}
      {showSquare && (
        <div className="absolute top-12 w-40 h-56 bg-slate-200 mt-4 mr-24 rounded-xl shadow-lg">
          
        </div>
      )}
    </div>
  );
};

export default ButtonWithSquare;

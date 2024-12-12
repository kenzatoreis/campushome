import React, { useState, useEffect } from "react";
import { User } from 'lucide-react';
import { useUser } from '../userData';
import { useNavigate } from 'react-router-dom';

const ButtonWithSquare: React.FC = () => {
  const [showSquare, setShowSquare] = useState(false);
  const navigate = useNavigate();
  
  const { user, setUser } = useUser();  // Get user and setUser from context

  const handleClick = () => {
    setShowSquare(!showSquare); // Toggle the square's visibility
  };

  const handleLogout = () => {
    setUser(null);  // Clear the user context
    localStorage.removeItem('studentData');  // Clear from localStorage
    navigate('/');  // Navigate to the login page or home page
  };

  // When user logs in or out, we need to reset showSquare visibility if necessary
  useEffect(() => {
    setShowSquare(false); // Reset the square visibility when user changes (e.g., after login/logout)
  }, [user]);

  return (
    <div className="flex flex-col items-center space-4 relative">
      <button
        onClick={handleClick}
        className="p-2 rounded-full hover:bg-emerald-800"
      >
        <User className="h-5 w-5" />
      </button>

      {/* The square will be positioned absolutely, with updated width */}
      {showSquare && user && (
        <div className="absolute flex flex-col items-center justify-center top-12 w-48 h-60 bg-slate-100 mt-4 mr-36 rounded-xl shadow-lg space-y-2">
          <div className="bg-slate-50 rounded-lg m-4 shadow-md">
            <p className="m-4 text-emerald-900 font-bold text-center">ID: {user.student_id}</p>
            <p className="m-4 text-emerald-900 font-bold text-center">Username: {user.username}</p>
            
          </div>
          <button onClick={handleLogout} className="text-white bg-emerald-800 rounded-full font-semibold hover:bg-emerald-700 rounded-full py-2 px-3">
              Logout
            </button>
        </div>
      )}
    </div>
  );
};

export default ButtonWithSquare;

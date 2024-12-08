import React, { useState } from "react";
import { User } from 'lucide-react';
import { useUser} from '../userData';
import {useNavigate} from 'react-router-dom';

const ButtonWithSquare: React.FC = () => {
  const [showSquare, setShowSquare] = useState(false);
  const navigate = useNavigate();
  
  const {username, student_id, email, setUser} = useUser();
  

  const handleClick = () => {
    setShowSquare(!showSquare); // Toggle the square's visibility
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('studentData');
    navigate('/');
    
    
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
        <div className="absolute flex flex-col items-center justify-center top-12 w-48 h-56 bg-slate-200 mt-4 mr-36 rounded-xl shadow-lg space-y-2">
          <p className="m-4 text-emerald-900 font-semibold">ID: {student_id}</p>
          <p className="m-4 text-emerald-900 font-semibold">Username: {username}</p>
          <button onClick = {handleLogout} className="text-emerald-900">
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default ButtonWithSquare;

import React from 'react';
import { Building2, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import ButtonWithSquare from './user';

export default function Header() {

  return (
    <header className="bg-emerald-900 text-white relative">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Title */}
          <Link to="/Home" className="flex items-center">
            <Building2 className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">CampusHome</span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="flex items-center space-x-5">
            <Link to="/Home" className="text-lg text-slate-200 font-semibold p-3 rounded-lg hover:bg-emerald-800">
              Home
            </Link> {/* Use Link for navigation */}
            <Link to="/Home/Booking" className="text-lg text-slate-200 font-semibold p-3 rounded-lg hover:bg-emerald-800">Booking</Link>
            <Link to="/Home/Storage" className="text-lg text-slate-200 font-semibold p-3 rounded-lg hover:bg-emerald-800">Storage</Link>          
            <Link to="/Home/RoomExchange" className="text-lg text-slate-200 font-semibold p-3 rounded-lg hover:bg-emerald-800"> Room Exchange</Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-emerald-800">
              <Bell className="h-5 w-5" />
            </button>
            <ButtonWithSquare />
          </div>
        </div>
      </nav>  
    </header>
  );
};

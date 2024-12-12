import React from 'react';
import { Home, Users, Key, Wrench, ClipboardList, Building2 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="bg-emerald-900 text-white w-64 min-h-screen p-4">
      <button 
        onClick={() => onTabChange('dashboard')}
        className="flex items-center mb-6">
        <Building2 className="mr-2 h-8 w-8" />
        <p className="text-xl font-bold">CampusHome</p>
      </button>
      <nav>
        <button
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-gray-300 hover:bg-emerald-700'
          }`}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => onTabChange('students')}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'students'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-gray-300 hover:bg-emerald-700'
          }`}
        >
          <Users size={20} />
          <span>Students</span>
        </button>
        <button
          onClick={() => onTabChange('rooms')}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'rooms'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-gray-300 hover:bg-emerald-700'
          }`}
        >
          <Key size={20} />
          <span>Rooms</span>
        </button>
        <button
          onClick={() => onTabChange('maintenance')}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'maintenance'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-gray-300 hover:bg-emerald-700'
          }`}
        >
          <Wrench size={20} />
          <span>Maintenance</span>
        </button>
        <button
          onClick={() => onTabChange('requests')}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
            activeTab === 'requests'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-gray-300 hover:bg-emerald-700'
          }`}
        >
          <ClipboardList size={20} />
          <span>Room Requests</span>
        </button>
      </nav>
    </div>
  );
}

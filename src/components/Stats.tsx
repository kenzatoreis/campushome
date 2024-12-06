import React from 'react';
import { Home, Users, Clock } from 'lucide-react';

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Home className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total Rooms</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Occupied</p>
            <p className="text-2xl font-bold">892</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Pending Applications</p>
            <p className="text-2xl font-bold">45</p>
          </div>
        </div>
      </div>
    </div>
  );
}
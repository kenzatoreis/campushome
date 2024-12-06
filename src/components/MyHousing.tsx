import React from 'react';
import { Building2, Users, DoorClosed } from 'lucide-react';

const currentHousing = {
  building: 23,
  floor: 2,
  room: "203",
  type: "triple",
  roommates: [
    { id: 1, name: "Aya Missar", year: "Junior", color: "bg-emerald-600" },
    { id: 2, name: "Fatima Zahra Dakir", year: "Junior", color: "bg-emerald-600" }
  ]
};

export default function MyHousing() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6">Current Housing Assignment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Building2 className="h-6 w-6 text-emerald-800" />
          </div>
          <div>
            <p className="text-sm text-emerald-700">Building</p>
            <p className="font-semibold text-emerald-900">Building {currentHousing.building}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <DoorClosed className="h-6 w-6 text-emerald-800" />
          </div>
          <div>
            <p className="text-sm text-emerald-700">Room</p>
            <p className="font-semibold text-emerald-900">{currentHousing.room} ({currentHousing.type})</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Users className="h-6 w-6 text-emerald-800" />
          </div>
          <div>
            <p className="text-sm text-emerald-700">Occupancy</p>
            <p className="font-semibold text-emerald-900">3/3</p>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-100 pt-6">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">Roommates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentHousing.roommates.map(roommate => (
            <div key={roommate.id} className="flex items-center space-x-4 p-4 bg-slate-100 rounded-lg">
              <div className={`w-12 h-12 rounded-full ${roommate.color}`} />
              <div>
                <p className="font-semibold text-emerald-900">{roommate.name}</p>
                <p className="text-sm text-emerald-700">{roommate.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
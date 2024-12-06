import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface Room {
  number: string;
  type: 'single' | 'double' | 'triple';
  available: boolean;
}

const buildings = Array.from({ length: 38 }, (_, i) => i + 19);

const mockRooms: Room[] = [
  { number: '01', type: 'single', available: true },
  { number: '02', type: 'double', available: false },
  { number: '03', type: 'triple', available: true },
  { number: '04', type: 'single', available: false },
  { number: '05', type: 'double', available: true },
  { number: '06', type: 'triple', available: true },
];

export default function RoomSelector() {
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-emerald-900">Room Selection</h2>
        <div className="flex space-x-4">
          <select
            className="rounded-lg border-emerald-300 text-emerald-800 focus:border-emerald-600 focus:ring-emerald-600"
            value={selectedBuilding || ''}
            onChange={(e) => setSelectedBuilding(Number(e.target.value))}
          >
            <option value="">Select Building</option>
            {buildings.map((building) => (
              <option key={building} value={building}>
                Building {building}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedBuilding ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRooms.map((room) => (
            <div
              key={room.number}
              className="border border-emerald-200 rounded-lg p-4 flex items-center justify-between hover:border-emerald-600 transition-colors"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-emerald-800" />
                  <span className="font-semibold text-emerald-900">
                    Building {selectedBuilding} - Room {room.number}
                  </span>
                </div>
                <p className="text-sm text-emerald-700 mt-1 capitalize">{room.type}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full ${
                  room.available
                    ? 'bg-emerald-200 text-emerald-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                <span className="font-medium">
                  {room.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-emerald-700">
          Select a building to view available rooms
        </div>
      )}
    </div>
  );
}

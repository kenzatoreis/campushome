import React, { useState, useEffect} from 'react';
import { Building2 } from 'lucide-react';
import Modal from './Modal';  // You'll create this modal component next

export default function RoomSelector2({ roomData, buildingData }) {
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to show/hide the modal
  const [selectedRoom, setSelectedRoom] = useState(null); // Store selected room for the modal

  useEffect(() => {
    if (selectedBuilding !== null) {
      const roomsForBuilding = roomData.filter(Room => Room.Bldg_id === selectedBuilding);
      setFilteredRooms(roomsForBuilding);
    } else {
      setFilteredRooms([]);
    }
  }, [selectedBuilding, roomData]);

  // Handle opening and closing of modal
  const openModal = (room) => {
    
    setSelectedRoom(room);  // Set the selected room data
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-emerald-900">Room Selection</h2>
        <div className="flex space-x-4">
          <select
            className="rounded-lg border-emerald-300 text-emerald-800 focus:border-emerald-600 focus:ring-emerald-600"
            value={selectedBuilding || ''}
            onChange={(e) => setSelectedBuilding(Number(e.target.value))}
          >
            <option value="">Select Building</option>
            {buildingData.map((Building) => (
              <option key={Building.Bldg_id} value={Building.Bldg_id}>
                Building {Building.Bldg_id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedBuilding && filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((Room, index) => (
            <React.Fragment key={Room.Room_numb}>

              {index % 6 === 0 && (
                <div className="col-span-full text-center text-xl text-emerald-800 font-bold my-2">
                  Floor: {index/6 +1}
                </div>
              )}
              <div
                className="bg-white border  shadow-md rounded-lg p-4 flex items-center justify-between hover:border-emerald-600 transition-colors hover:bg-white">
                <div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-emerald-700" />
                    <span className="font-semibold text-emerald-900">
                      Building {selectedBuilding} - Room {Room.Room_numb}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700 mt-1 capitalize mb-5">{Room.Room_type}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full ${
                    Room.Status === 'available'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  <span className="font-medium">{Room.Status}</span>
                </div>
              </div>
          
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-emerald-700 font-medium">
          Select a building to view available rooms
        </div>
      )}

      {/* Modal */}
      {showModal && selectedRoom && (
        <Modal room={selectedRoom} onClose={closeModal} />
      )}
    </div>
  );
}

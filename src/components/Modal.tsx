import React from 'react';
import axios from 'axios';
import { X} from 'lucide-react';
import { useUser} from '../userData';


// Define types for the room prop
interface Room {
  Bldg_id: number;
  Room_numb: string;
  Room_type: string;
  Status: string;
  Occupancy: number;
}



// Define types for the Modal props
interface ModalProps {
  room: Room;
  onClose: () => void;
}


const Modal: React.FC<ModalProps> = ({ room, onClose }) => {
    
    const {user, setUser} = useUser();
    console.log("student:", user.student_id);

    const Book = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/book', {
                student_id: user.student_id,
                room_numb: room.Room_numb,
                bldg_id: room.Bldg_id,
            });
            if (response.status === 201) {
                alert('Booking successful');
            } else {
                alert('Failed to book room');
            }
        } catch (error) {
            console.error('Error booking room:', error);
            alert('Error occurred while booking the room');
        }
    };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          className="absolute top-4 right-4 text-emerald-900 hover:text-emerald-800"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="bg-white border  shadow-md rounded-lg mt-7 mb-4 p-4">
          <div className="mb-4 text-emerald-900">
            <strong>Building:</strong> {room.Bldg_id}
          </div>
          <div className="mb-4 text-emerald-900">
            <strong>Room Number:</strong> {room.Room_numb}
          </div>
          <div className="mb-4 text-emerald-900">
            <strong>Room Type:</strong> {room.Room_type}
          </div>
          <div className="mb-4 text-emerald-900">
            <strong>Status:</strong> {room.Status}
          </div>
          <div className="mb-3 text-emerald-900">
            <strong>Occupancy:</strong> {room.Occupancy}
          </div>
        </div>
        <button onClick={Book} className="bg-emerald-800 shadow-md rounded-lg p-3 flex items-center hover:bg-emerald-700">
              <p className="text-slate-50 text-base">Book Now</p>
        </button>
      </div>
    </div>
  );
}

export default Modal;

import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Users, Home, DoorClosed, CheckCircle } from 'lucide-react';

export function Dashboard({onNavigate}) {
  const [studentsData, setStudentsData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/studentsinfo')
      .then((response) => {
        setStudentsData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load student data.');
      });
  }, []);

  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/roomdata')
     .then(response => setRoomData(response.data))
     .catch(error => console.error(error));
  }, []);

  const [buildingData, setBuildingData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/buildingdata')
     .then(response => {setBuildingData(response.data)

     })
     .catch(error => console.error(error));
  }, []);

  const [requestData, setRequestData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/requestinfo')
      .then((response) => {
        setRequestData(response.data);
      })
  }, []);

  const calculateTotalRooms = () => {
    return roomData.length;
  };

  const calculateTotalBuildings = () => {
    return buildingData.length;
  };
  const calculateTotalStudents = () => {
    return studentsData.length;
  };

  const calculateTotalRequests = () => {
    return requestData.length;
  };


  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 ml-2 text-emerald-900">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <button onClick={() => onNavigate('students')} className="bg-white rounded-lg shadow-md p-6 flex items-center hover:bg-slate-100">
          <div className="bg-blue-500 p-4 rounded-lg">
            <Users className="text-white" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-emerald-800">{calculateTotalStudents()}</p>
          </div>
        </button>

        {/* Available Rooms */}
        <button onClick={() => onNavigate('rooms')} className="bg-white rounded-lg shadow-md p-6 flex items-center hover:bg-slate-100">
          <div className="bg-emerald-700 p-4 rounded-lg">
            <DoorClosed className="text-white" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">Available Rooms</p>
            <p className="text-2xl font-bold text-emerald-800">{calculateTotalRooms()}</p>
          </div>
        </button>

        {/* Maintenance Done */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="bg-purple-500 p-4 rounded-lg">
            <Home className="text-white" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">Total Buildings</p>
            <p className="text-2xl font-bold text-emerald-800">{calculateTotalBuildings()}</p>
          </div>
        </div>

        {/* Pending Requests */}
        <button onClick={() => onNavigate('requests')} className="bg-white rounded-lg shadow-md p-6 flex items-center hover:bg-slate-100">
          <div className="bg-yellow-500 p-4 rounded-lg">
            <CheckCircle className="text-white" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">Pending Requests</p>
            <p className="text-2xl font-bold text-emerald-800">{calculateTotalRequests()}</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

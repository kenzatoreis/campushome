import React, {useState, useEffect} from 'react';
import {ClipboardList, ArrowLeftRight} from 'lucide-react';
import axios from 'axios';

export default function RoomRequest(onNavigate){
  const [requestData, setRequestData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/requestinfo')
      .then((response) => {
        setRequestData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load student data.');
      });
  }, []);

  const acceptRequest = (bookingId) => {
    axios
      .post(`http://localhost:5000/api/acceptrequest/${bookingId}`)
      .then((response) => {
        setSuccessMessage('Room assignment successful!');
        // Refresh the data after a successful update
        axios.get('http://localhost:5000/api/requestinfo').then((res) => setRequestData(res.data));
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to accept the request.');
      });
      window.location.reload();
      onNavigate('requests');
  };

  const rejectRequest = (bookingId) => {
    axios
      .post(`http://localhost:5000/api/rejectrequest/${bookingId}`)
      .then((response) => {
        setSuccessMessage('Room request rejected.');
        // Remove the rejected request from the state
        setRequestData((prevData) => prevData.filter((request) => request.booking_id !== bookingId));
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to reject the request.');
      });
      window.location.reload();
      onNavigate('requests');
  };

  return(
    <div className="min-h-screen bg-slate-100">
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-yellow-500 rounded-lg p-4 pr-6 flex absolute space-x-2 shadow-lg">
        <ClipboardList className="h-8 w-8 text-white mt-1" />
        <p className="text-3xl font-bold text-white">Room Requests</p>
      </div>

      <div className="grid grid-cols-1 mt-24 gap-4">   
        {requestData.map((request) => (
          <div
            key={request.booking_id}
            className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow gap-2"
          >
            <div>
              <h2 className="font-bold text-yellow-500">{request.booking_id}</h2>
            </div>
            <div className="flex items-center gap-14">

              <div className="text-gray-600 bg-slate-50 rounded-lg shadow-lg p-2">
                <span className="font-medium">ID:</span> {request.student_id}
              </div>


              <div className="bg-slate-50 flex items-center rounded-lg shadow-lg p-2 gap-24">
                <div>
                  <div className="text-gray-600 flex gap-2">
                    <p className="font-medium">Current Room:</p>
                    <p>None</p>
                  </div>
                  <div className="text-gray-600 flex gap-2">
                    <p className="font-medium">Building ID:</p>
                    <p>None</p>
                  </div>
                </div>

                <ArrowLeftRight className="text-yellow-500"/>

                <div>
                  <p className="text-gray-600">
                    <span className="font-medium">Room Number:</span> {request.room_numb}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Building ID:</span> {request.bldg_id}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {/*Accept*/}
                <button
                    onClick={() => acceptRequest(request.booking_id)}
                    className="bg-green-600 text-white px-3 pb-1 rounded-full hover:bg-green-600 hover:bg-green-700"
                  >
                    <p className="text-sm">Accept</p>
                </button>
                {/*Reject*/}
                <button
                  onClick={() => rejectRequest(request.booking_id)}
                  className="bg-red-600 text-white px-4 pb-1 rounded-full hover:bg-red-700"
                >
                  <p className="text-sm">Reject</p>
                </button>
              </div>

            </div>
          </div>
          ))}
          {requestData.length === 0 && <p className="text-gray-500">No room requests available.</p>}
      </div>
    </main>
  </div>
  )
}
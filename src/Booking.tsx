import {useState, useEffect} from 'react';
import {Album} from "lucide-react";
import axios from 'axios';
import Header from './components/Header';
import RoomSelector from './components/RoomSelector';


function Home() {
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


  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-emerald-900 rounded-lg p-4 pr-6 flex absolute space-x-2 shadow-lg">
          <Album className="h-8 w-8 text-white mt-1"/>
          <p className="text-3xl font-bold text-white">Booking</p>
        </div>
        <RoomSelector roomData={roomData} buildingData={buildingData}/>
        {/* Include AI here*/}
      </main>
    </div>
  );
}
export default Home;
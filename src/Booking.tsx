import {useState, useEffect} from 'react';
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
        <RoomSelector roomData={roomData} buildingData={buildingData}/>
      </main>
    </div>
  );
}
export default Home;
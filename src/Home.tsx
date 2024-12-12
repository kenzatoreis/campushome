import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Header from './components/Header';
import MyHousing from './components/MyHousing';
import Dates from './components/Dates';
import { useUser} from './userData';

const Home: React.FC = () => {
  const {user, setUser} = useUser();
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [currentStudentData, setCurrentStudentData] = useState<any | null>(null);
  console.log("username:", user?.student_id);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/studentsinfo')
      .then((response) => {
        setStudentsData(response.data);
      })
  }, []);

  useEffect(() => {
    // Filter the student data for the current user
    if (user && studentsData.length > 0) {
      const filteredStudent = studentsData.find(
        (student) => student.Student_id === user.student_id
      );
      setCurrentStudentData(filteredStudent);
    }
  }, [user, studentsData]);

  return (
    
    <div className="min-h-screen bg-slate-100">
      <Header/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">My Campus Housing</h1>
          <p className="mt-2 text-emerald-700 font-medium">View and manage your housing assignment</p>
        </div>
        {currentStudentData?.Room_id? (
          <div>
            <MyHousing />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg h-56 p-6 mb-7 space-y-4">
            <p className="text-3xl font-bold text-emerald-900 ">Don't have a Room!</p>
            <div className="bg-emerald-900 rounded-xl shadow-lg p-6 mb-8 item-center hover:bg-emerald-800">
              <Link to="/Home/Booking" className="text-xl font-semibold text-slate-100">Book Now</Link>
            </div>
          </div>
        )}
        <Dates />
      </main>
    </div>
  );
}
export default Home;
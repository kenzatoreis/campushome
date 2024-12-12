import React, { useState, useEffect } from 'react';
import { SquareUserRound, Users, Search } from 'lucide-react';
import axios from 'axios';

export function Studentsadmin() {
  const [studentsData, setStudentsData] = useState([]);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState(''); // State for storing search input

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

  // Filter students based on searchId
  const filteredStudents = studentsData.filter((student) =>
    student.Student_id.toString().includes(searchId)
  );

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-blue-500 rounded-lg p-4 pr-6 flex items-center space-x-2 shadow-lg">
        <Users className="h-8 w-8 text-white mt-1" />
        <p className="text-3xl font-bold text-white">Students</p>
      </div>

      {/* Search Input */}
      <div className="mt-6 mb-4 flex gap-2">
        <Search className="item-center mt-2 text-blue-600"/>
        <input
          type="text"
          placeholder="Search by Student ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student.Student_id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-emerald-800 mb-2">
                {student.Std_firstName} {student.Std_lastName}
              </h2>
              <SquareUserRound className="text-blue-500 mb-3" />
              <p className="text-gray-600">
                <span className="font-medium">ID:</span> {student.Student_id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Username:</span> {student.Username}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Assigned Room:</span>{' '}
                {student.Room_id || 'Not Assigned'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Building:</span> {student.Bldg_id || 'Not Assigned'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Gender:</span> {student.Gender || 'Not Specified'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No students found with the given ID.</p>
        )}
      </div>
    </div>
  );
}

export default Studentsadmin;

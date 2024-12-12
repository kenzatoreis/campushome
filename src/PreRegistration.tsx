import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './userData'; // Assuming useUser hook gives access to the logged-in user
import Header from './components/Header';

interface Building {
  bldg_id: number;
  name: string;
}

export default function PreRegistration() {
  const { user, setUser } = useUser(); // Get logged-in user
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [smokingPreference, setSmokingPreference] = useState<string>('no');
  const [sleepPreference, setSleepPreference] = useState<string>('early');
  const [studyPreference, setStudyPreference] = useState<string>('early');
  const [preferredRoommate, setPreferredRoommate] = useState<number | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // This useEffect fetches buildings based on the user's gender
  useEffect(() => {
    if (user) {
      // Fetch buildings based on user gender
      axios
        .get(`http://localhost:5000/api/buildings?gender=${user.gender}`)
        .then((response) => setBuildings(response.data))
        .catch((error) => console.error('Error fetching buildings:', error));
    }
  }, [user]);



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmissionError(null);

    const requestData = {
      student_id: user?.student_id,
      bldg_id: selectedBuilding,
      smoker: smokingPreference === 'yes',
      sleep_preference: sleepPreference,
      study_preference: studyPreference,
      preferred_roommate_id: preferredRoommate || null,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/pre_registration', requestData);
      if (response.status === 200) {
        alert('Pre-registration successful!');
        // Optionally reset form fields or redirect the user
      }
    } catch (error: any) {
      console.error('Error submitting pre-registration:', error);
      setSubmissionError('Failed to submit pre-registration. Please try again.');
    }
  }




  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-emerald-900 mb-6">Pre-Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Student ID</label>
            <input
              type="text"
              value={user?.student_id || ''}
              disabled
              className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Building Preference</label>
            <select
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={selectedBuilding || ''}
              onChange={(e) => setSelectedBuilding(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select a building</option>
              {buildings.map((building) => (
                <option key={building.bldg_id} value={building.bldg_id}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Do you smoke?</label>
            <div className="flex items-center">
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="yes"
                  checked={smokingPreference === 'yes'}
                  onChange={() => setSmokingPreference('yes')}
                />
                Yes
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="smoke"
                  value="no"
                  checked={smokingPreference === 'no'}
                  onChange={() => setSmokingPreference('no')}
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sleep Preference</label>
            <select
              value={sleepPreference}
              onChange={(e) => setSleepPreference(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="early">Early</option>
              <option value="late">Late</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Study Preference</label>
            <select
              value={studyPreference}
              onChange={(e) => setStudyPreference(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="early">Early</option>
              <option value="late">Late</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Preferred Roommate ID (Optional)</label>
            <input
              type="number"
              value={preferredRoommate || ''} // Set to empty string if null
              onChange={(e) => setPreferredRoommate(e.target.value ? parseInt(e.target.value) : null)} // Convert input to number or null
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg">Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
}

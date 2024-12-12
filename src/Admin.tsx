import React, { useState } from 'react';
import { Sidebar } from './components/SideBar';
import { Dashboard } from './DashBoard';
import { Studentsadmin} from './StudentsAdmin';
import  AvailableRooms from './AvailableRooms';
import RoomRequest from './RoomRequest';

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'students':
        return <Studentsadmin />;
      case 'rooms':
        return <AvailableRooms />;
      case 'requests':
        return <RoomRequest/>
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default Admin;
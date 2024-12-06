import React from 'react';
import Header from './components/Header';
import RoomSelector from './components/RoomSelector';

function Home() {


  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RoomSelector />
      </main>
    </div>
  );
}
export default Home;
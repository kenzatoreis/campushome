import React from 'react';
import Header from './components/Header';
import MyHousing from './components/MyHousing';
import Dates from './components/Dates';

function Home() {


  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">My Campus Housing</h1>
          <p className="mt-2 text-emerald-700">View and manage your housing assignment</p>
        </div>

        <MyHousing />
        <Dates />
      </main>
    </div>
  );
}
export default Home;
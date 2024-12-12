import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Home';
import Admin from './Admin';
import RoomExchange from './RoomExchange';
import Booking from './Booking';
import SignIn from './SignIn';
import SignUp from './SignUp';
import DashBoard from './DashBoard';
import StudentsAdmin from './StudentsAdmin';
import {UserProvider} from './userData';
import RoomRequest from './RoomRequest';
import PreRegistration from './PreRegistration';

function App() {
  return (
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/Home" element={<Home />} />
            <Route path="/Home/RoomExchange" element={<RoomExchange />} />
            <Route path="/Home/Booking" element={<Booking />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Admin/DashBoard" element={<DashBoard/>} />
            <Route path="/Admin/StudentsAdmin" element={<StudentsAdmin/>} />
            <Route path="/Admin/RoomRequest" element={<RoomRequest />} />
            <Route path="/Home/PreRegistration" element={<PreRegistration />} />
          </Routes>  
        </BrowserRouter>
      </UserProvider>
  );
}
export default App;
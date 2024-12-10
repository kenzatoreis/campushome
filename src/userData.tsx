import React, { useState, useEffect, createContext, useContext } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [student, setStudent] = useState<{
    Username: string;
    Student_id: number;
    Email: string;
    Gender: string;
    Phonenumber: string;
    Std_type: string;
    Std_firstName: string;
    Std_lastName: string;
    Room_id: number;
    Bldg_id: number;
  } | null>(null);

  // Check if user data exists in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
      setStudent(JSON.parse(storedData));
    }
  }, []);

  // Ensure that 'user' is correctly updated when 'student' changes
  const user = student ? {
    username: student.Username,
    student_id: student.Student_id,
    email: student.Email,
    gender: student.Gender,
    phonenumber: student.Phonenumber,
    std_type: student.Std_type,
  } : null;

  return <UserContext.Provider value={{ user, setUser: setStudent }}>{children}</UserContext.Provider>;
};

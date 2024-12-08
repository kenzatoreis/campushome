import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState({
    Username: '',
    Password: '',
    Email: '',
    Gender: '',
    Phonenumber: ''
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post('http://localhost:5000/api/signup', userData);
      
      // Save user data to local storage (or context)
      localStorage.setItem('user', JSON.stringify(response.data));

      // Redirect to Home with user data
      navigate('/Home');
    } catch (error) {
      setError('Error during sign-up. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="Username" value={userData.Username} onChange={handleChange} />
        <input type="text" name="Email" value={userData.Email} onChange={handleChange} />
        <input type="password" name="Password" value={userData.Password} onChange={handleChange} />
        <input type="text" name="Gender" value={userData.Gender} onChange={handleChange} />
        <input type="text" name="Phonenumber" value={userData.Phonenumber} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

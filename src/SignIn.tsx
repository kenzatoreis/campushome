import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Building2} from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom';
const SignIn: React.FC = () => {

  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Send GET request using Axios
      const response = await axios.get('http://localhost:5000/api/signin', {
        params: {
          Username: credentials.Username,
          Password: credentials.Password,
        },
    }); 

    const { role, message, ...userData } = response.data;

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    console.log("Login successful: ", message);

    // Redirect based on role
    if (role === 'student') {
      const studentData = response.data;
      localStorage.setItem('studentData', JSON.stringify(studentData));
      navigate('/Home');
    } else if (role === 'admin') {
      navigate('/Admin');
    }
      window.location.reload();
    }catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.data) {
      setError((axiosError.response.data as { error: string }).error || "Invalid Usename or Password");
    } else {
      setError("An error occurred. Please try again.");
    }
    console.error(axiosError);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center">
        
        <div className="flex w-[900px] h-[500px] shadow-lg my-7">
          {/* Left Section */}
          <div className="w-1/2 bg-white p-8 py-20">
            <h2 className="text-3xl font-bold text-emerald-800 text-center mb-6">Sign In</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="Username" className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="Username"
                  name="Username"
                  value={credentials.Username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Enter your Username"
                  required
                />
              </div>
              <div>
                <label htmlFor="Password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="Password"
                  id="Password"
                  name="Password"
                  value={credentials.Password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    className="form-checkbox text-emerald-700 focus:ring focus:emerald-700"
                  />
                  <span className="ml-2 text-gray-600">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-emerald-700 hover:underline">
                  Forgot Password
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-pink-300"
              >
                Sign In
              </button>
            </form>
        </div>

          {/* Right Section */}
          <div className="w-1/2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white p-8 flex flex-col items-center justify-center">
            <Building2 className="w-12 h-12 mb-5" />
            <h2 className="text-3xl font-bold">Welcome to CampusHome</h2>
            <p className="mt-4">Don't have an account?</p>
            <Link
              to="/SignUp"
              className="mt-4 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-emerald-700">
              Sign Up
            </Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
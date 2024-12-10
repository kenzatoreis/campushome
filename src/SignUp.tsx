import React, { useState } from "react";
import { Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    Username: "",
    Gender: "",
    Email: "",
    Phonenumber: "",
    Password: "",
});

const [error, setError] = useState("");
const navigate = useNavigate(); 

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setCredentials({
    ...credentials,
    [name]: value,
  });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!credentials.Username || !credentials.Gender || !credentials.Email || !credentials.Phonenumber || !credentials.Password) {
    setError("Please fill all fields.");
    return;
  }

try {
  const response = await axios.post("http://127.0.0.1:5000/api/signup", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    console.log("Signup successful:", response.data);
    navigate('/');
  }
} 
catch (error) {
  setError("Signup failed. Please try again.");
  console.error("Error during signup:", error);
}
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center">
        <div className="flex w-[900px] h-[520px] shadow-lg pd-5">
          {/* Left Section */}
          <div className="w-1/2 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white p-8 flex flex-col items-center justify-center">
            <Building2 className="h-12 w-12 mb-5" />
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="mt-4">Already have an account?</p>
            <Link
              to="/"
              className="mt-4 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-emerald-700"
            >
              Sign In
            </Link>
          </div>

          {/* Right Section */}
          <div className="w-1/2 bg-white p-8">
            <h2 className="text-3xl font-bold text-emerald-800 text-center mb-6">Sign Up</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
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
                <div className="flex-1">
                  <label htmlFor="Gender" className="block text-sm font-medium text-gray-600">
                    Gender
                  </label>
                  <select
                    id="Gender"
                    name="Gender"
                    value={credentials.Gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  >
                    <option value="text-slate-50" disabled>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="Email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="Email"
                  id="Email"
                  name="Email"
                  value={credentials.Email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="Phonenumber" className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="Phonenumber"
                  name="Phonenumber"
                  value={credentials.Phonenumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Enter your phone number"
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
                  placeholder="Create your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-pink-300"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
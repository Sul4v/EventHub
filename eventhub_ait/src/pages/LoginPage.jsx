import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
// Form component
const LoginPage = () => {

  const handleSubmit = async () => {
    console.log("This is being clicked")
    try {
        const response = await axios.get('http://localhost:4000/login');
        console.log(response.data); // Handle the response from the backend
    } catch (error) {
        console.error("Error during login:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form action="#" method="POST" className="space-y-6 max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
      
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          Login
        </button>

        {/* Additional Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600">Don't have an account? <Link to="/registration" className="text-blue-500 hover:underline">Sign up</Link></p>
        </div>
      </form>
    </div>
    
  );
};

export default LoginPage;

import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form action="#" method="POST" className="space-y-6 max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
        
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required 
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
          />
        </div>

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
        >
          Register
        </button>

        {/* Additional Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;

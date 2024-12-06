import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = ({ onRegister }) => {

  // Get API URL from environment variable
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State for form data including username
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State for handling errors and loading status
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value // Update specific field based on input id
    });
  };

  // Submit handler with API integration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous errors
    setLoading(true); // Show loading state

    try {
      // Make API call to register endpoint
      const response = await axios.post(`${API_URL}/register`, formData);
      
      if (response.data.user) {
        onRegister(response.data.user);
        // Store the user data
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Set the User-Id header for future requests
        axios.defaults.headers.common['User-Id'] = response.data.user.id;
        
        // Redirect to home page after successful registration
        navigate('/', { replace: true }); // replace: true prevents back navigation
      } else {
        setError('Registration failed - user data not received');
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // The server responded with an error
        switch (error.response.status) {
        case 400:
          setError(error.response.data.message || 'Username or email already exists');
          break;
        case 500:
          setError('Server error. Please try again later');
          break;
        default:
          setError(error.response.data?.message || 'Registration failed');
        }
      } else if (error.request) {
        // The request was made but no response received
        setError('No response from server. Please check your connection.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
        
        {/* Error message display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* Error icon */}
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
          <input 
            type="text" 
            id="username" 
            value={formData.username} // Controlled input
            onChange={handleChange} // Change handler
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
            value={formData.email} // Controlled input
            onChange={handleChange} // Change handler 
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
            value={formData.password} // Controlled input
            onChange={handleChange} // Change handler
            required 
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} // Disable button while loading
          className={`w-full px-4 py-2 font-bold text-white rounded transition-colors
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {loading ? 'Registering...' : 'Register'} {/* Dynamic button text */}
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

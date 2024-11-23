import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {

  // Get API URL from environment variable
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            'User-Id': userId
          }
        });
        setUserEvents(response.data.createdEvents || []);
        setLoading(false);
      } catch (error) {
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <div className="bg-indigo-100 rounded-full p-3">
              <svg className="h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {/* User Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Your Events</h3>
          
          {userEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't created any events yet.</p>
              <a 
                href="/post-event" 
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Create Your First Event
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userEvents.map((event) => (
                <div 
                  key={event._id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
                        {event.type}
                      </span>
                      <h4 className="text-lg font-semibold mt-2">{event.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {event.contactEmail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage
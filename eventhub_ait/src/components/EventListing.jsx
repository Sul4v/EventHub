import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaUser
} from 'react-icons/fa';


const EventListing = ({ event }) => {

  // Get API URL from environment variable
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [joining, setJoining] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleClick = () => {
    navigate(`/event/${event._id}`);
  };

  const handleJoin = async (e) => {
    if (isCreator) {
      return;
    }
    e.stopPropagation();  // prevent card click navigation
    setJoining(true);
    try {
      await axios.post(`${API_URL}/event/${event._id}/join`, {}, {
        headers: {
          'User-Id': userId
        }
      });

      // Success message or UI update
      setJoining(false);
      setHasJoined(true);
    } 
    catch (error) {
      if (error) {
        setJoining(false);
      }
      
    }
  };

  // Check if user is creator or already joined
  const isCreator = event.createdBy._id === userId;
  const [hasJoined, setHasJoined] = useState(false);
  useEffect(() => {
    setHasJoined(event.participants?.includes(userId));
  }, [userId, event.participants]);
  

  return (
    <div onClick={handleClick} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <div className="p-6">
        {/* Event Type Badge */}
        <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full mb-3">
          {event.type}
        </span>

        {/* Event Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {event.name}
        </h3>

        {/* Brief Description */}
        <p className="text-gray-600 mb-4">
          {event.description.substring(0, 100)}...
        </p>


        {/* Contact Info Section */}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="space-y-2 mb-4">
            {/* Contact Name */}
            <div className="flex items-center text-gray-600">
              <FaUser className="w-4 h-4 mr-2" />
              <span>{event.contactName}</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
            
            {/* Email */}
            <div className="flex items-center text-gray-600">
              <FaEnvelope className="w-4 h-4 mr-2" />
              <span>{event.contactEmail}</span>
            </div>
            
            {/* Phone */}
            <div className="flex items-center text-gray-600">
              <FaPhone className="w-4 h-4 mr-2" />
              <span>{event.contactPhone}</span>
            </div>
          </div>
          
          {/* Join Button Section */}
          {!isCreator && (
            <button
              onClick={(e) => handleJoin(e)}
              disabled={joining || hasJoined || isCreator}
              className={`w-full mt-4 px-4 py-2 rounded-md text-white transition-colors ${
                hasJoined
                  ? 'bg-green-500 cursor-not-allowed'
                  : joining
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {hasJoined ? 'Joined' : joining ? 'Joining...' : 'Join Event'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListing;
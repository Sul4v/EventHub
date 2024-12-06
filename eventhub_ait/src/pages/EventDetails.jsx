// pages/EventDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaUser,
  FaUserFriends
} from 'react-icons/fa';

const EventDetails = () => {

  // Get API URL from environment variable
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(false);
  const [joinStatus, setJoinStatus] = useState(''); // 'joined', 'creator', or ''
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/event/${id}`, {
          headers: {
            'User-Id': userId
          }
        });
        setEvent(response.data.event);

        // Check user's relationship to event
        if (response.data.event.createdBy === userId) {
          setJoinStatus('creator');
        } else if (response.data.event.participants?.includes(userId)) {
          setJoinStatus('joined');
        }
      } catch (error) {
        if (error) {
          setError('Failed to load event details');
        }
        
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, userId, API_URL]);

  const handleJoinEvent = async () => {
    try {
      setJoining(true);

      const response = await axios.post(`${API_URL}/event/${id}/join`, {}, {
        headers: {
          'User-Id': userId
        }
      });

      if (response.data.success) {
        // Update local state
        setEvent(prev => ({
          ...prev,
          participants: [...(prev.participants || []), userId]
        }));
        setJoinStatus('joined');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to join event';
      setError(errorMessage);
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveEvent = async () => {
    try {
      setLeaving(true);
      
      await axios.post(`${API_URL}/event/${id}/leave`, {}, {
        headers: {
          'User-Id': userId
        }
      });
  
      // Update local state
      setEvent(prev => ({
        ...prev,
        participants: prev.participants?.filter(p => p !== userId) || []
      }));
      setJoinStatus('');
      
    } catch (error) {
      setError('Failed to leave event: ', error);
    } finally {
      setLeaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error || 'Event not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">

          {/* Event Status */}
          <div className="flex justify-between items-start mb-6">
            <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
              {event.type}
            </span>
            <div className="flex items-center text-gray-600">
              <FaUserFriends className="w-5 h-5 mr-2" />
              <span>{event.participants?.length || 0} participants</span>
            </div>
          </div>

          {/* Event Title */}
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-6">
            {event.name}
          </h1>

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600">{event.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <FaUser className="w-5 h-5 mr-3" />
                <span>{event.contactName}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="w-5 h-5 mr-3" />
                <span>{event.location}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="w-5 h-5 mr-3" />
                <span>{event.contactEmail}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaPhone className="w-5 h-5 mr-3" />
                <span>{event.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {joinStatus === 'creator' ? (
              <button
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                You are the organizer
              </button>
            ) : joinStatus === 'joined' ? (
              <button
                onClick={handleLeaveEvent}
                disabled={leaving}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400"
              >
                {leaving ? 'Leaving...' : 'Leave Event'}
              </button>
            ) : (
              <button
                onClick={handleJoinEvent}
                disabled={joining}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
              >
                {joining ? 'Joining...' : 'Join Event'}
              </button>
            )}
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetails;
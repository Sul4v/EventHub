// pages/EventDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaUser,
  FaCalendar 
} from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/event/${id}`, {
          headers: {
            'User-Id': localStorage.getItem('userId')
          }
        });
        setEvent(response.data.event);
      } catch (error) {
        setError('Failed to load event details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    try {
      setJoining(true);
      const response = await axios.post(`http://localhost:8080/event/${id}/join`, {}, {
        headers: {
          'User-Id': localStorage.getItem('userId')
        }
      });
      // Update event data or show success message
      alert('Successfully joined the event!');
    } catch (error) {
      alert('Failed to join event');
      console.error('Error:', error);
    } finally {
      setJoining(false);
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
          {/* Event Type Badge */}
          <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
            {event.type}
          </span>

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
            <button
              onClick={handleJoinEvent}
              disabled={joining}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
            >
              {joining ? 'Joining...' : 'Join Event'}
            </button>
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
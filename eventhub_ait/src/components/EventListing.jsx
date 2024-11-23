import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaUser 
} from 'react-icons/fa';


const EventListing = ({event}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event._id}`);
  };

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
        </div>
      </div>
    </div>
  )
}

export default EventListing
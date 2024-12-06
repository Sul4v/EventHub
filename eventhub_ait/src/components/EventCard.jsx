import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event._id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-block px-2 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
              {event.type}
            </span>
            {type === 'joined' && (
              <span className="inline-block px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                Joined
              </span>
            )}
          </div>
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
  );
};

export default EventCard;
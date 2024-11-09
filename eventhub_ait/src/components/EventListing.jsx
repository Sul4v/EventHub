import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa'

const EventListing = ({event}) => {

  // state itself, name of the function that'll change its state
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = event.description

  // making the description shorter and adding a button to show full description
  if (!showFullDescription) {
    description = description.substring(0, 90) + "..."
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{event.type}</div>
          <h3 className="text-xl font-bold">{event.title}</h3>
        </div>

        <div className="mb-5">
          {description}
        </div>

        <button onClick={ () => setShowFullDescription((prevState) => !prevState)} className="text-indigo-500 mb-5 hover:text-indigo-600">
          { showFullDescription ? 'Less' : 'More'}
        </button>

        <h3 className="text-indigo-500 mb-2">{event.salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            { event.location }
          </div>
          <Link
            to  ={`/events/${event.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventListing
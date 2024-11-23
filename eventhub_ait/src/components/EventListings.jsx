import React from 'react'
import events from '../jobs.json'
import EventListing from './EventListing'
import axios from 'axios'
import { useEffect, useState } from 'react'


const EventListings = ({ isHome = false, eventsArray = []}) => {

  const eventListings = isHome ? eventsArray.slice(0, 3) : eventsArray

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          { isHome ? 'Recent Events' : 'Browse Events'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          { eventListings.map((event) => (
            <EventListing key={event._id || event.id} event={ event }/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventListings
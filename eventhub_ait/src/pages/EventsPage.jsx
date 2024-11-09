import React from 'react'
import EventListings from '../components/EventListings'
import {useState, useEffect} from 'react'

const EventsPage = ({ eventsArray = []}) => {

  return (
    <section className="bg-blue-50 px-4 py-6">
      <EventListings eventsArray={eventsArray}/>
    </section>
  )
}

export default EventsPage
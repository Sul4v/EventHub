import React from 'react'
import EventListings from '../components/EventListings'
import {useState, useEffect} from 'react'

const EventsPage = ({ eventsArray = []}) => {

  const [events, setEvents] = useState(eventsArray);

  // Update the state if the eventsArray prop changes
  useEffect(() => {
    setEvents(eventsArray);
  }, [eventsArray]); // Only re-run if eventsArray changes

  return (
    <section className="bg-blue-50 px-4 py-6">
      <EventListings eventsArray={events}/>
    </section>
  )
}

export default EventsPage
import React from 'react'

import Hero from '../components/Hero'
import EventListings from '../components/EventListings'
import ViewAllEvents from '../components/ViewAllEvents'
import HomeCards from '../components/HomeCards'

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <EventListings isHome={true}/>
      <ViewAllEvents />
    </>
    
  )
}

export default HomePage
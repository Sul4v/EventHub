import React from 'react';

import Hero from '../components/Hero';
import EventListings from '../components/EventListings';
import ViewAllEvents from '../components/ViewAllEvents';
import HomeCards from '../components/HomeCards';

const HomePage = ({ eventsArray=[] }) => {

  return (
    <>
      <Hero />
      <HomeCards />
      <EventListings isHome={true} eventsArray={eventsArray}/>
      <ViewAllEvents />
    </>
    
  );
};

export default HomePage;
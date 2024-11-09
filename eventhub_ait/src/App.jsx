import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from "axios"

import HomePage from './pages/Homepage'
import MainLayout from './layouts/MainLayout'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import EventsPage from './pages/EventsPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import PostEventPage from './pages/PostEventPage'

const API = import.meta.env.VITE_BACKEND_URL;


const App = () => {

  // Add new event
  const postEvent = async (newEvent) => { 
    try{
      // const res = await axios.post(`http://localhost:4000/event`, newEvent );
      const res = await axios.post(`${API}/event`, newEvent );
      console.log('Event created successfully:', res.data);
    }
    catch (error) {
      console.error('Error creating event:', error);
    }
  }

  // Fetch Events
  const [eventArray, setEventArray] = useState([])

  const fetchAPI = async () => {
    try {
      // const response = await axios.get(`http://localhost:4000/fetch-data`);
      const response = await axios.get(`${API}/fetch-data`);
    
      setEventArray(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<MainLayout />} >
        <Route index element={<HomePage/>} />   
        <Route path='/profile' element={<ProfilePage/>} /> 
        <Route path='/events' element={<EventsPage eventsArray={eventArray}/>} /> 
        <Route path='/login' element={<LoginPage/>} /> 
        <Route path='/registration' element={<RegistrationPage/>} /> 
        <Route path='/post-event' element={ <PostEventPage postEventSubmit={postEvent} /> } /> 
  
        <Route path='*' element={<NotFoundPage/>} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
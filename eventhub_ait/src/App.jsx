import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
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
import EventDetails from './pages/EventDetails'

const API = import.meta.env.VITE_BACKEND_URL;

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};


const App = () => {

  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  // NEW: Check authentication status on app load
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem('user');
    
    if (userId && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['User-Id'] = userId;
    }
  }, []);

  // Add new event
  const handlePostEvent = async (newEvent) => { 
    try{
      const userId = localStorage.getItem('userId')
      const res = await axios.post(`http://localhost:8080/event`, newEvent, {
        headers: {
          'User-Id': userId
        }
      });
      // const res = await axios.post(`http://linserv1.cims.nyu.edu:12207/event`, newEvent );
      console.log('Event created successfully:', res.data);
      // Refresh events after posting
      fetchEvents()
      return { success: true }
    } catch (error) {
      console.error('Error creating event:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create event'
      }
    }
  }

  // Fetch Events

  const fetchEvents = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.log('No userId found');
        return;
      }
      const response = await axios.get(`http://localhost:8080/fetch-data`, {
        headers: {
          'User-Id': userId
        }
      });
      // const response = await axios.get(`http://linserv1.cims.nyu.edu:12207/fetch-data`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // });
    
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      if (error.response?.status === 401) {
        // Handle unauthorized access
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }

  // Auth handlers
  const handleLogin = (userData) => {
    console.log('Logging in with:', userData); // Debug log

    localStorage.setItem('userId', userData.id);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    axios.defaults.headers.common['User-Id'] = userData.id;
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    delete axios.defaults.headers.common['User-Id'];
    window.location.href = '/login'; // forces navigation
  };

  useEffect(() => {
    fetchEvents()
  }, [])
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<MainLayout onLogout={handleLogout} user={user}/>} >
        <Route index element={<ProtectedRoute><HomePage/></ProtectedRoute>} />   
        <Route path='/profile' element={<ProtectedRoute><ProfilePage user={user}/></ProtectedRoute>} /> 
        {/* <Route path='/events' element={<EventsPage eventsArray={eventsArray}/>} />  */}
        <Route path='/events' element={
          <ProtectedRoute>
            <EventsPage eventsArray={events} />
          </ProtectedRoute>
        } />
        <Route path='/post-event' element={
          <ProtectedRoute>
            <PostEventPage postEventSubmit={handlePostEvent} />
          </ProtectedRoute>
        } />
        <Route path='/login' element={isAuthenticated ? <Navigate to='/' replace /> : <LoginPage onLogin={handleLogin}/>} /> 
        <Route path='/registration' element={isAuthenticated ? <Navigate to='/' replace /> : <RegistrationPage onRegister={handleLogin} />} /> 

        <Route path="/event/:id" element={ <ProtectedRoute> <EventDetails /></ProtectedRoute> } />
  
        <Route path='*' element={<NotFoundPage/>} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
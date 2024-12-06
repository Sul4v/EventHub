import { React, useEffect, useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import axios from 'axios';

import HomePage from './pages/Homepage';
import MainLayout from './layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PostEventPage from './pages/PostEventPage';
import EventDetails from './pages/EventDetails';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

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

  // Check authentication status on app load
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem('user');
    
    if (userId && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['User-Id'] = userId;
      // Fetch events after setting auth state
      fetchEvents();
    }
  }, []);

  // Add new event
  const handlePostEvent = async (newEvent) => { 
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`${API_URL}/event`, newEvent, {
        headers: {
          'User-Id': userId
        }
      });

      // Refresh events after posting
      fetchEvents();
      return { success: true };
    } catch (error) {
      console.error('Error creating event:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create event'
      };
    }
  };

  // Fetch Events

  const fetchEvents = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // No userId found
        return;
      }
      const response = await axios.get(`${API_URL}/fetch-data`, {
        headers: {
          'User-Id': userId
        }
      });
    
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      if (error.response?.status === 401) {
        // Handle unauthorized access
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  };

  // Auth handlers
  const handleLogin = (userData) => {

    localStorage.setItem('userId', userData.id);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    axios.defaults.headers.common['User-Id'] = userData.id;
    // Fetch events after login
    fetchEvents();
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
    fetchEvents();
  }, []);
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<MainLayout onLogout={handleLogout} user={user}/>} >
        
        <Route index element={<ProtectedRoute><HomePage eventsArray={events}/></ProtectedRoute>} />   
        <Route path='/profile' element={<ProtectedRoute><ProfilePage user={user}/></ProtectedRoute>} /> 

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
  );

  return <RouterProvider router={router} />;
};

export default App;
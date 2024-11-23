import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = ({ onLogout, user }) => {
  return (
    <>
      <Navbar user={user} onLogout={onLogout}/>
      <Outlet /> {/*whatever route you're on will come from this outlet */}
    </>
  )
}

export default MainLayout
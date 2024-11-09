import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/*whatever route you're on will come from this outlet */}
    </>
  )
}

export default MainLayout
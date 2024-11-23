import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const linkClass = ({ isActive }) => isActive ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"

  const handleLogout = () => {
    onLogout();
    navigate('/login')
  }
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto  px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* Logo */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >EventHub
              </span>
            </NavLink>

            <div className="md:ml-auto">
              <div className="flex space-x-2 text-white">
                {/* Always visible lini */}
                <NavLink
                  to="/events"
                  className={ linkClass }
                  >Events
                </NavLink>

                {user ? (
                  // Links for authenticated users
                  <>
                    <NavLink to="/post-event" className={linkClass}>
                      Post Event
                    </NavLink>
                    <NavLink to="/profile" className={linkClass}>
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  // Links for non-authenticated users
                  <>
                    <NavLink to="/login" className={linkClass}>
                      Login
                    </NavLink>
                    <NavLink to="/registration" className={linkClass}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
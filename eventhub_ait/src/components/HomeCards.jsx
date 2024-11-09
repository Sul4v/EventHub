import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          
          <Card>
            <h2 className="text-2xl font-bold">For Participants</h2>
              <p className="mt-2 mb-4">
                Browse for events nearby
              </p>
              <Link
                to="/events"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Browse Events
              </Link>
          </Card>

          <Card bg='bg-indigo-100'>  
            <h2 className="text-2xl font-bold">For Organizers</h2>
            <p className="mt-2 mb-4">
              If you got an event coming up, why not post it?
            </p>
            <Link
              to="/post-events"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Post Event
            </Link>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomeCards
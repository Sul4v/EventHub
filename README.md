

# EventHub

## Overview

EventHub is a web application that allows individuals, organizations, and businesses to post and manage events. Users can browse various events, join those they’re interested in, and view their upcoming events on their profiles. Whether it's a concert, workshop, community meet-up, or corporate seminar, EventHub makes it easy to discover and participate in events of all kinds.

Registered users can log in to create, view, and join events. The platform provides a user-friendly interface for event organizers to promote their events and for users to keep track of the ones they've joined.


## Data Model

The application will store the following entities: Users, Events, and Join Records, and it will have relationships between them as follows:

* Users can create and join multiple events.
* Events can have multiple participants (Users).
* Join Records link Users and Events to track user participation.

An Example User:

```javascript
{
  username: "janedoe",
  hash: // a password hash,
  createdEvents: // an array of references to Event documents,
  joinedEvents: // an array of references to Join Record documents
}
```

An Example Event:

```javascript
{
  organizer: // a reference to a User object,
  title: "Tech Conference 2024",
  description: "A two-day event covering the latest in tech.",
  date: "2024-11-01",
  location: "New York City, NY",
  attendees: // an array of references to Join Record documents,
  createdAt: // timestamp
}
```

An Example Join Record:
```javascript
{
  user: // a reference to a User object,
  event: // a reference to an Event object,
  joinedAt: // timestamp
}
```

## [Link to Commented First Draft Schema](src/db.mjs) 


## Wireframes

/ - redirect to /events page

/events/create - page for creating a new event

/events - page for viewing all available events

/events/
- page for viewing details of a specific event

/profile - user profile page showing user profile and upcoming joined events


![Events page and Profile page](images/image1.jpg)
![Login and Registration page](images/image2.jpg)
![Event Detail page](images/image3.jpg)

## Site map 

![Site Map](images/site_map.jpg)

* Home (/)
  - Landing page introcuing the app, with links to login or sign up

* Sign Up (/signup)
  - Page for new users to register
  - Links to login page if the user already has an account

* Login (/login)
  - Page for existing users to log in
  - Links to sign-up page if the user doesn't have an account

* Events (/events)
  - Main user page after login
  - Shows a feed of all upcoming events with options to view details or join.
  - Sub-pages from Dashboard
    + Create Event (/events/create)
      - Form for users to create a new event
    + Event Details (/events/:id)
      - Page displaying specific event details
      - Option to join the event if not already joined

* Profile (/profile)
  - Shows the user's joined events and a history of past events


### Site Map Flow Example

  * Home (/)
      ↓ Links to Sign Up or Login
  * Sign Up (/signup)
      ↓ After sign-up, redirects to Dashboard
  * Login (/login)
      ↓ After login, redirects to Dashboard
  * Events (/events)
      ↓ Access all events
      ↓ Links to Create Event and Event Details pages
  * Event Details (/events/:id)
      ↓ Join event option (redirects back to Events page or Profile after joining)
  * Profile (/profile)
      ↓ Shows joined events and links to settings if needed

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new event
4. as a user, I can view a list of all events
5. as a user, I can join events
6. as a user, I can view upcoming events I have joined on my profile page

## Research Topics

* (2 points) Make the Webpage responsive
  * will make sure that this webpage will have a responsive UI, i.e. it will have adapt to the device screen size. (mobile phone, tablet, computer)
* (3 points) Geolocation and Mapping with Google Maps API
    * will use GoogleMaps API for the events' location. I'll assign 4 points for this.
* (5 points) react.js
    * will use react.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points



## [Link to Initial Main Project File](src/app.mjs)  



## Annotations / References Used

Nothing as of yet
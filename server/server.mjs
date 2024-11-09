import './config.mjs';
import './db.mjs';
import mongoose from 'mongoose';
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json());

const Event = mongoose.model("Event")

app.use(cors({
  origin: '*' // this is the frontend url

}))
const PORT = process.env.PORT ?? 3000

app.get('/api', async (req, res) => {
  try {
    const events = await Event.find();  // Fetches all events from MongoDB
    res.status(200).json(events);       // Sends the events data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error });
  }
})

app.get('/login', (req, res) => {
  res.json({ message: 'Login route' })
})

app.post('/event', async (req, res) => {
  try {
    console.log("000000000")
    console.log(req.body.title)
    console.log("111111111")
    // Create new event using data from request body
    const newEvent = new Event({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      location: req.body.location,
      contactName: req.body.contactName,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone
    });

    console.log(newEvent)

    // Save to database
    const savedEvent = await newEvent.save();
    
    // Send success response with the saved event
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: savedEvent
    });

  } catch (err) {
    console.log("afdsasfdds")
    console.error("Error adding event to database:", err);
    // Send error response
    res.status(500).json({
      success: false,
      message: 'Could not create event',
      error: err.message
    });
  }
});


app.listen(PORT, () => console.log(`Server started in port ${PORT}`))



// import './config.mjs'
// import express from 'express';
// import cors from 'cors'
// import mongoose from 'mongoose'
// import sanitize from 'mongo-sanitize'

// const port = process.env.PORT || 4000

// const app = express()


// const corsOptions = {
//   origin: ["http://localhost:5173"] // only accepting request from our front-end server
// }

// app.use(cors(corsOptions))

// // const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
// // mongoose.connect(process.env.DSN, dbOptions)
// // .then(() => console.log('DB Connected!'))
// // .catch(err => console.log(err))


// // Get paths

// app.post('/post-event', async (req, res) => {
//   const newEvent = new Event({
//     type: sanitize(req.body.type),
//     name: sanitize(req.body.name),
//     description: sanitize(req.body.description),
//     location: sanitize(req.body.location),
//     contactName: sanitize(req.body.contactName),
//     contactEmail: sanitize(req.body.contactEmail),
//     contactPhone: sanitize(req.body.contactPhone),
//   });
//   try {
//     await newEvent.save()
//   } catch (err) {
//     console.log("there has been an error" + err.message)
//   }
// })

// app.get('/events', (req, res) => {
//   res.json({fruits: ["apple", "orange"]})
// })

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`)
// })
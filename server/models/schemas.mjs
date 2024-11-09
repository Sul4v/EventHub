import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  type: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  contactName: {type: String, required: true},
  contactEmail: {type: String, required: true},
  contactPhone: {type: String, required: true},
})

const Users = mongoose.model('Events', eventSchema, 'events')

const mySchemas = {'Events': Events}

module.exports = mySchemas
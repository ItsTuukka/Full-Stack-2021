const mongoose = require('mongoose')

const journeySchema = new mongoose.Schema({
  departureTime: String,
  returnTime: String,
  departureStationId: String,
  departureStationName: String,
  returnStationId: String,
  returnStationName: String,
  distance: Number,
  duration: Number,
})

journeySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Journey', journeySchema)

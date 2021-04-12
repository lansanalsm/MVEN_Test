const mongoose = require('mongoose')
const Schema = mongoose.Schema

// mongoose schemas
const clientSchema = new Schema({
  email: String,
  name: String,
  phone: String,
  providers: []
})

// models
module.exports = mongoose.model('Client', clientSchema)

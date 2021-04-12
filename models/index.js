const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Provider schema and model
const providerSchema = new Schema({
  name: String
})

const Provider = mongoose.model('Provider', providerSchema)

// Client shema and model
const clientSchema = new Schema({
  email: String,
  name: String,
  phone: String,
  providers: [{
    type: Schema.Types.ObjectId,
    ref: 'Provider'
  }]
})

const Client = mongoose.model('Client', clientSchema)

// models export
module.exports = {
  Client,
  Provider
}

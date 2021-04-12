const express = require('express')
const ObjectId = require('mongodb').ObjectID

//
// Clients API endpoints
//
const clientRoutes = express.Router()
const providerRoutes = express.Router()

// models
const models = require('./models')
const Provider = models.Provider
const Client = models.Client

// get and post routes
clientRoutes.route('/')
  .get(function (req, res) {
    Client.find().populate('providers').then((data) => {
      res.json(data)
    })
  })
  .post(function (req, res) {
    const client = new Client(req.body)
    client.save().then((err) => {
      if (err) { console.error(err) }
      res.status(200).json({ business: 'Client saved successfully' })
    })
      .catch(() => {
        res.status(400).send('unable to save to database')
      })
  })

// edit, update and delete routes
clientRoutes.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    Client.findById(id, function (err, client) {
      if (err) {
        res.json(err)
      }
      res.json(client)
    })
  })
  .put(function (req, res) {
    Client.findById(req.params.id, (err, client) => {
      if (err) res.json(err)
      if (!client) {
        res.status(404).send('data is not found')
      } else {
        client.name = req.body.name
        client.email = req.body.email
        client.phone = req.body.phone
        client.providers = req.body.providers
        client.save().then(() => {
          res.json('Update succesfully completed')
        }).catch(() => {
          res.status(400).send('unable to update the database')
        })
      }
    })
  })
  .delete(function (req, res) {
    Client.findByIdAndRemove({ _id: req.params.id }, (err) => {
      if (err) res.json(err)
      else res.json('Successfully removed')
    })
  })

//
// Provider API endpoints
//

// get and post routes
providerRoutes.route('/')
  .get(function (req, res) {
    Provider.find((err, providers) => {
      if (err) {
        res.json(err)
      } else {
        res.json(providers)
      }
    })
  })
  .post(function (req, res) {
    const provider = new Provider(req.body)
    provider.save().then((err) => {
      if (err) { console.error(err) }
      res.status(200).json({ business: 'Provider saved successfully' })
    })
      .catch(() => {
        res.status(400).send('unable to save to database')
      })
  })

// edit, update and delete routes
providerRoutes.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    Provider.findById(id, function (err, provider) {
      if (err) {
        res.json(err)
      }
      res.json(provider)
    })
  })
  .put(function (req, res) {
    Provider.findById(req.params.id, (err, provider) => {
      if (err) res.json(err)
      if (!provider) {
        res.status(404).send('data is not found')
      } else {
        provider.name = req.body.name
        provider.save().then(() => {
          res.json('Update succesfully completed')
        }).catch(() => {
          res.status(400).send('unable to update the database')
        })
      }
    })
  })
  .delete(function (req, res) {
    Provider.findByIdAndRemove({ _id: req.params.id }, (err) => {
      if (err) res.json(err)
      else res.json('Successfully removed')
    })
  })

module.exports = {
  clientRoutes,
  providerRoutes
}

const express = require('express')
const apiRoutes = express.Router()

// Client
const Client = require('./models')

// Defined get data(index or listing) route
apiRoutes.route('/')
  .get(function (req, res) {
    Client.find((err, clients) => {
      if (err) {
        res.json(err)
      } else {
        res.json(clients)
      }
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

// Defined edit route
apiRoutes.route('/:id')
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

module.exports = apiRoutes

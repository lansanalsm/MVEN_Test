const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./models/db.config')

const apiRoute = require('./api')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()
const path = require('path')
const PORT = 3000
const NODE_ENV = process.env.NODE_ENV || 'production'

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/clients', apiRoute)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Serve Vue.js as SPA in production
if (NODE_ENV === 'production') {
  app.use(express.static('dist'))
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../dist') })
  })
}

app.listen(PORT, function () {
  console.log(`Server is running in ${NODE_ENV} on Port:`, PORT)
})

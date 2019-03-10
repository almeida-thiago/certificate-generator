'use strict'

const express = require('express') // Load express
const cors = require('cors') // Load cors

/** Settings */
const settings = (app) => {
  app.use(express.json()) // Set body type to json
  app.use(cors()) // Cors settings
  app.use('/images', express.static(`${__dirname}/assets/images`)); //Set static directory
}

/** Set headers */
const setHeaders = (app) => {
  app.use((req, res, next) => {
    res.removeHeader('X-Powered-By') // Remove express signature
    res.setHeader('application', process.env.APP_NAME) // Set application name
    res.setHeader('Version', process.env.APP_VERSION) // Set application version
    next()
  })
}

/** Routes */
const routes = (app) => {
  const routes = require('./routes') // Load routes
  app.use(routes)
}

/** Error handler */
const errorsHandler = (app) => {
  app.use((err, req, res, next) =>
    /** Return errors as a json */
    res.status(400).send({
      error: true,
      message: err.message
    })
  )
}

/** Application start */
const app = (express) => {
  const app = express() // Create express app
  setHeaders(app) // Set headers
  settings(app) // Settings
  routes(app) // Routes
  errorsHandler(app) // Erro handler
  return app
}

module.exports = app(express)
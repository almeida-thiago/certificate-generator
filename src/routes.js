'use strict'

const router = require('express').Router() // Load express router

const generateCertificate = (router) =>
  router.get('/certificate', async (req, res) => {
    const certificate = await require('./controllers/certificate')(req) // Require certificate controller
    res.status(200).type('application/pdf').send(certificate)
  })

const routerError = (router) =>
  router.use((req, res, next) => {
    if (!req.route) throw new Error('Requested route not exists.') // Error message
    next()
  })

module.exports = [
  generateCertificate(router),
  routerError(router)
]

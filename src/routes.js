'use strict'

const cryptoJS = require('crypto-js')
const router = require('express').Router() // Load express router

const generateCertificateLink = (router) =>
  router.post('/require-certificate', async (req, res) => {
    const hash = cryptoJS.AES.encrypt(JSON.stringify(req.body), 'certificate')
    res.status(200).send({
      success: true,
      certificate: `${req.protocol}://${req.get('host')}/certificate?hash=${hash}`
    })
  })

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
  generateCertificateLink(router),
  generateCertificate(router),
  routerError(router)
]

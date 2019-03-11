'use strict'

/**
 * Certificate generator - 1.0.0
 * Thiago Almeida
 */

if (process.env.NODE_ENV.trim() == 'development') require('dotenv').load() // Load environment variables

const server = require('./app') // Include app

/** Start server */
server.listen(process.env.PORT || 3000, () => {
  const separator = '........................................' // Text separator
  console.log(separator)
  if (process.env.APP_NAME) console.log(`Application: ${process.env.APP_NAME}`) // Show application name
  if (process.env.APP_VERSION) console.log(`Version: ${process.env.APP_VERSION}`) // Show application version
  if (process.env.APP_NAME || process.env.APP_VERSION) console.log(separator)
  console.log(`Date: ${new Date()}`) // Show last start application date
  console.log('Status: Online') // Show application status
  console.log(separator)
  if (process.env.URL_ACCESS) {
    console.log('Access point:')
    console.log(`-> https://${process.env.URL_ACCESS}:${process.env.PORT}`) // Show application secure access point
    console.log(`-> http://${process.env.URL_ACCESS}:${process.env.PORT}`) // Show application unsecure access point
    console.log(separator)
  }
})
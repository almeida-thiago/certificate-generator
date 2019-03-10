'use strict'

const file = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

const generateCertificate = async (req) => {
  const data = req.body
  const certificateBg = data.bg ? data.bg : `${req.protocol}://${req.get('host')}/images/certificate_bg.jpg`

  /** Certificate body */
  const certificateBody = `
    <div style="background-image: url('${certificateBg}'); background-position: center; background-repeat: no-repeat; background-size: contain;; height: calc(100vh - 16px); width: 100%">
    <div>
  `

  try {
    return await (async () => {
      const browser = await puppeteer.launch() // Initiates browser
      const page = await browser.newPage() // Set new page
      await page.setContent(certificateBody) // Set content
      const pdfSettings = {
        format: 'A4',
        printBackground: true,
        landscape: true
      }
      const buffer = await page.pdf(pdfSettings) // Generate pdf buffer
      await browser.close() // Close browser
      return buffer // Return pdf data
    })()
  } catch (error) {
    return {
      error: true,
      module: 'Contract',
      message: error.message
    }
  }
}

module.exports = generateCertificate
'use strict'

const cryptoJS = require('crypto-js')
const puppeteer = require('puppeteer')

/** Certificate body */
const certificateBody = (req) => {
  const hash = cryptoJS.AES.decrypt(req.query.hash.replace(/ /g, '+'), 'certificate')
  const data = JSON.parse(hash.toString(cryptoJS.enc.Utf8))
  const fontFamily = data.fontFamily ? data.fontFamily : 'sans-serif' // Set font
  const backgound = data.backgound ? data.backgound : `${req.protocol}://${req.get('host')}/images/certificate_bg.jpg` // Set background
  let text = data.lang == 'pt-br' ? `Certifico que <b>${data.name}</b> participou ${data.event.titleGender == 'm' || data.event.titleGender == 'm' ? 'do' : 'da'} <b>${data.event.title}</b> realizada por <b>${data.institute}</b>, no dia <b>${data.event.date}</b>, com carga horária de <b>${data.event.hours}h</b>.` : `This is to certify that <b>${data.name}</b> participated in <b>the ${data.event.title}</b> by <b>${data.institute}</b>, on <b>${data.event.date}</b>, with a total time of <b>${data.event.hours}h</b>.` // Set text
  text = data.text ? data.text.replace('[NAME]', data.name) : text // Custom text

  /** Get signers */
  const signers = (signers) => {
    let signersPlace = ''
    signers.map(signer => {
      signersPlace += `<h2 style="margin: 0; padding: 0.5rem 4rem; border-top: 2px solid #000000; font-size: 1rem; text-align: center">${signer.name}<br><small style="font-weight: normal">${signer.description}</small></h2>`
    })
    return signersPlace
  }

  return `
    <div style="font-family: ${fontFamily}; background-image: url('${backgound}'); background-position: center; background-repeat: no-repeat; background-size: contain; height: 100%; width: 100%">
      <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-around; align-items: center">
        <h1 style="width: 50%; margin: 0; padding: 0; text-transform: uppercase; font-size: 2.5rem; text-align: center">${data.lang == 'pt-br' ? 'Certificado' : 'Certificate'}</h1>
        <p style="width: 75%; margin: 0; padding: 0; font-size: 1.5rem; text-align: center">${text}</p>
        <div style="width: 80%; display: flex; flex-direction: row; justify-content: space-around">
          <h2 style="margin: 0; padding: 0.5rem 4rem; border-top: 2px solid #000000; font-size: 1rem; text-align: center">${data.name}<br><small style="font-weight: normal">${data.lang == 'pt-br' ? 'Participante' : 'Participant'}</small></h2> 
          ${signers(data.signers)}
        </div>
      </div>
    <div>
  `
}

const generateCertificate = async (req) => {
  try {
    return await (async () => {
      const browser = await puppeteer.launch() // Initiates browser
      const page = await browser.newPage() // Set new page
      await page.setContent(certificateBody(req)) // Set content
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
      message: error.message
    }
  }
}

module.exports = generateCertificate
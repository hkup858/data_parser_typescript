

const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Server = function () {
  const conversionController = require('./controllers/conversionController')()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
    app.post('/api/v1/parse', async (req, res) => {
      try {
        console.log('In Server V1 Parse')
        console.log('Raw Data: ', req.body)
        const results = await conversionController.convertV1(req.body && req.body.data ? req.body.data : '')
        return res.status(200).send({statusCode: 200, data: results})
      } catch (err) {
        console.log(`Error In Server V1 Parse: ${err}`)
        return res.status(500).send(err)
      }
    })

    app.post('/api/v2/parse', async (req, res) => {
      try {
        console.log('In Server V2 Parse')
        console.log('Raw Data: ', req.body)
        const results = await conversionController.convertV2(req.body && req.body.data ? req.body.data : '')
        return res.status(200).send({statusCode: 200, data: results})
      } catch (err) {
        console.log(`Error In Server V2 Parse: ${err}`)
        return res.status(500).send(err)
      }
    })
    app.listen(port)
    console.log('Listening on port ' + port)
}
    
module.exports = Server()
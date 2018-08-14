const express = require('express')
const app = express()
const RabbitService = require('./rabbitService')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/', (req, res) => {
  const message = req.body.message

  if(message.length > 1) {
    RabbitService.sendMessage('poc-queue', message)
    res.send('Message sended')
  } else {
    res.send('The message cant be empty')
  }
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Example app listening on port 8080!')
})
const amqp = require('amqplib/callback_api')

class rabbitService {

  sendMessage(queue, message) {
    amqp.connect('amqp://localhost', (err, conn) => {
      conn.createChannel((err, channel) => {
        if(err) {
          console.log(err)
          return;
        }

        channel.assertQueue(queue, {durable: false})
        channel.sendToQueue(queue, new Buffer(message))
      })
    
      setTimeout(() => {
        conn.close()
      }, 500)
    })
  }
}

module.exports = new rabbitService()

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => { 
  conn.createChannel((err, ch) => {
    const queue = 'poc-queue';

    ch.assertQueue(queue, {durable: false})

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    ch.consume(queue, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true})
  })
})
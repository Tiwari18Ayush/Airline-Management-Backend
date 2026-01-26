const amqplib = require('amqplib');

let channel, connection;

async function connectToQueue() {
    try {
        // Use an environment variable for the connection string
        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();

        // Durable: true ensures the queue survives a RabbitMQ restart
        await channel.assertQueue("Notification-Queue", { durable: true });
        
        console.log("Successfully connected to RabbitMQ");
    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
        throw error; // Re-throw so the app knows it failed to start
    }
}

async function sendData(data) {
    try {
        if (!channel) {
            await connectToQueue(); // Safety check
        }
        // persistent: true ensures the message is saved to disk
        await channel.sendToQueue("Notification-Queue", Buffer.from(JSON.stringify(data)), {
            persistent: true
        });
    } catch (error) {
        console.error("Failed to send data to RabbitMQ:", error);
        throw error;
    }
}

module.exports = { connectToQueue, sendData };
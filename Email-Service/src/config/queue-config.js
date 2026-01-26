const amqplib = require("amqplib");

async function subscribeToQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue("Notification-Queue", { durable: true });
    // Prefetch ensures the worker handles only one message at a time
    channel.prefetch(1);

    console.log("Waiting for messages in Notification-Queue...");

    channel.consume("Notification-Queue", async (msg) => {
      if (!msg) return;

      // ✅ FIX: Lazy load the service here to break circular dependency
      const ticketService = require("../services/Ticket-Service");

      try {
        const mailData = JSON.parse(msg.content.toString());
        
        // STEP 1: Save to Database (Audit Log)
        // Note: Using 'recipentEmail' to match your Booking Service spelling
        const ticket = await ticketService.createTicket({
          recipientEmail: mailData.recipentEmail||mailData.recipientEmail, 
          subject: mailData.subject,
          content: mailData.content,
          status: 'PENDING' 
        });

        console.log("Ticket recorded in DB. Attempting to send email...");

        // STEP 2: Send the actual email
        await ticketService.sendEmail({
          recipientEmail: mailData.recipentEmail||mailData.recipientEmail,
          subject: mailData.subject,
          content: mailData.content,
        });

        // STEP 3: Acknowledge the message
        channel.ack(msg);
        console.log("✅ Email sent and logged successfully!");

      } catch (err) {
        console.error("❌ Processing failed:", err.message);
        // Nack without requeueing to prevent infinite loops on bad data
        channel.nack(msg, false, false);
      }
    });
  } catch (error) {
    console.error("RabbitMQ Consumer Error:", error);
  }
}

// Ensure the function is exported correctly for index.js to use
module.exports = { subscribeToQueue };
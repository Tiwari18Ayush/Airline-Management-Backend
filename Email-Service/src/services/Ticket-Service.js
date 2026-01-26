// Ticket-Service.js
const { TicketRepository } = require('../repositories');
const { transporter } = require('../config/Mail-Config');
const AppError = require('../utils/AppError');
const ServerConfig = require('../config');
const ticketRepository = new TicketRepository();

async function sendEmail(data) {
    try {
        const response = await transporter.sendMail({
            from: ServerConfig.USER,
            to: data.recipientEmail, // Fixed typo from 'recipentEmail'
            subject: data.subject,
            text: data.content,
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot send email', 500);
    }
}

// src/services/Ticket-Service.js
async function createTicket(data) {
    try {
        const response = await ticketRepository.create({
            subject: data.subject,
            content: data.content,
            recipentEmail: data.recipientEmail, // Map the 'i' version to the model's 'e' version
            status: data.status || 'PENDING'
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create Ticket', 500);
    }
}

// ... other functions
module.exports = { sendEmail, createTicket };
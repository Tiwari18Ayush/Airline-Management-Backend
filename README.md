# Airline Management System - Backend

A professional microservices-based backend for an Airline Booking platform. This repository follows a monorepo structure, containing four independent services that communicate to handle flight management, ticket bookings, and automated notifications.

## 🏗️ Project Structure

The project is divided into the following services:

* **API Gateway**: The entry point for all client requests, handling routing and request aggregation.
* **Flights Service**: Manages airplanes, airports, cities, and flight schedules.
* **Booking Service**: Handles the logic for seat reservations and payment processing.
* **Email Service**: An asynchronous service that sends booking confirmations via RabbitMQ.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v16+ recommended)
* **MySQL** (Database for Flights and Booking services)
* **RabbitMQ** (Message broker for the Email service)
* **Sequelize CLI** (For running migrations)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Tiwari18Ayush/Airline-Management-Backend.git](https://github.com/Tiwari18Ayush/Airline-Management-Backend.git)
   cd Airline-Management-Backend

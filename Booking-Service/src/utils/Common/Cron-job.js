const cron = require('node-cron');
const BookingService = require('../../services/Booking-service'); 

function setupCronJobs() {

    // Schedule: every 30 minutes
    // '*/30 * * * *'
    // For every 1 minute use: '* * * * *'
    // For every 5 minutes use: '*/5 * * * *'

    cron.schedule('*/10 * * * *', async () => {
        // console.log('--- STARTING CRON JOB: CLEANUP EXPIRED BOOKINGS ---');

        try {
            await BookingService.cancelOldInitialBookings();
            // console.log('--- CRON JOB COMPLETED SUCCESSFULLY ---');
        } catch (error) {
            console.error('--- CRON JOB FAILED ---');
            console.error(error);
        }
    });
}

module.exports = setupCronJobs;

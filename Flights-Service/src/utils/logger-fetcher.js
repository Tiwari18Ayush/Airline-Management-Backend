const fs = require('fs').promises;
const path = require('path');

/**
 * Fetches and parses log data from the Winston logger's combined.log file.
 * @returns {Promise<Array>} An array of log entry objects with timestamp, level, and message.
 */
async function fetchLoggerData() {
    const logFilePath = path.join(__dirname, '../../combined.log'); // Adjust path relative to utils folder

    try {
        const data = await fs.readFile(logFilePath, 'utf8');
        if (!data.trim()) {
            return []; // Return empty array if file is empty
        }

        const lines = data.trim().split('\n');
        const logEntries = lines.map(line => {
            // Expected format: "YYYY-MM-DD HH:mm:ss : level: message"
            const parts = line.split(' : ');
            if (parts.length >= 3) {
                const timestamp = parts[0];
                const level = parts[1];
                const message = parts.slice(2).join(' : '); // In case message contains ' : '
                return { timestamp, level, message };
            }
            return null; // Invalid line
        }).filter(entry => entry !== null);

        return logEntries;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Log file does not exist:', logFilePath);
            return [];
        }
        throw error; // Re-throw other errors
    }
}

module.exports = { fetchLoggerData };

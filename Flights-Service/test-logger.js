const { loggerFetcher } = require('./src/utils');

async function test() {
    try {
        const data = await loggerFetcher.fetchLoggerData();
        console.log('Fetched log data:', data);
    } catch (err) {
        console.error('Error:', err);
    }
}

test();

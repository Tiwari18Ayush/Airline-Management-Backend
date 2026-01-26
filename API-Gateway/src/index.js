const express = require('express');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { RateLimiter } = require('./utils/Common');

const app = express();

// 1. Essential Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RateLimiter);

// 2. Flight Service Proxy Test
app.use('/flights-service', createProxyMiddleware({
    target: ServerConfig.FLIGHTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/flights-service': '' },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] Forwarding request to Flight Service: ${req.method} ${req.url}`);
        // This ensures your POST/PUT data isn't lost
        fixRequestBody(proxyReq, req); 
    }
}));

// 3. Booking Service Proxy Test
app.use('/bookings-service', createProxyMiddleware({
    target: ServerConfig.BOOKINGS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/bookings-service': '' },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] Forwarding request to Booking Service: ${req.method} ${req.url}`);
        fixRequestBody(proxyReq, req);
    }
}));

// 4. Local API Routes
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Gateway is running. Target Flights: ${ServerConfig.FLIGHTS_SERVICE_URL}`);
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
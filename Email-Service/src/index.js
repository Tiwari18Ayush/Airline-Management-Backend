const express = require('express');

const  ServerConfig = require('./config/server-config');
const apiRoutes = require('./routes');
const { Queue}=require('./config');

const app = express();
app.use(express.json());   // ✅ MUST
app.use(express.urlencoded({ extended: true })); // optional
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    Queue.subscribeToQueue();
});

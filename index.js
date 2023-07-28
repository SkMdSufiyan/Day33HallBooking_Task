const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Cinfuring dotenv

const database = require('./configurations/databaseConnect.js'); // Importing database

const roomsRouter = require('./routes/rooms.routes.js');
const bookingRouter = require('./routes/bookings.routes.js');

const app = express(); // Initialising express app
app.use(express.json()); // Utilising express.json() method

database();
        
// For task-1
app.use('/api', roomsRouter);

// For tasks - 2, 3, 4, 5
app.use('/api', bookingRouter);


// Listening to the app
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});



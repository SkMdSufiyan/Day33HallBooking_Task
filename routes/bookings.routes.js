const express = require('express');
// Importing the customized functions from "bookings.controller.js"
const { bookRoom, listAllBookedRoomsData, getCustomersBookedData, getHowManyTimesCustomerBooked } = require('../controllers/bookings.controller');

// Initialising bookingRouter
const bookingRouter = express.Router();

// POST call to book a room (Task-2)
bookingRouter.post('/bookRoom', bookRoom);

// GET call to list all rooms with booked data (Task-3)
bookingRouter.get('/allBookedRoomsData', listAllBookedRoomsData);
// GET call to list all customers with booked data (Task-4)
bookingRouter.get('/customersBookedData', getCustomersBookedData);
// GET call to list how many time a customer booked room with corresponding data (Task-5)
bookingRouter.get('/howManyTimesCustomerBooked', getHowManyTimesCustomerBooked);

module.exports = bookingRouter;
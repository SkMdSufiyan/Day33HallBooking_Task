const express = require('express');
const { createRoom } = require('../controllers/rooms.controller'); // Importing createRoom function

// Initialising roomsRouter
const roomsRouter = express.Router();

// POST call for creating a room
roomsRouter.post('/createRoom', createRoom);


module.exports = roomsRouter;

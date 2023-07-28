const mongoose = require('mongoose');

// Creating room schema
const roomSchema = new mongoose.Schema({
    roomName : {
        type : String,
        unique : true,
        trim : true,
        required : true
    },
    numberOfSeats : {
        type : Number,
        trim : true,
        required : true
    },
    pricePerHour : {
        type : Number,
        required : true,
        trim : true
    },
    amenities : {
        type : Array,
        required : true
    },
    status : {
        type : String,
        default : "Available"
    }
});

// Exporting rooms model
module.exports = mongoose.model("Rooms", roomSchema);
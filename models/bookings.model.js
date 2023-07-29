const mongoose = require('mongoose');

// Creating booking schema
const bookingSchema = new mongoose.Schema({
    customerName : {
        type : String,
        required : true,
        trim : true
    },
    roomName : {
        type : String,
        required : true,
        trim : true
    },
    bookingDate : {
        type : String
    },
    startTime : {
        type : String
    },
    endTime : {
        type : String
    },
    stayHours : {
        type : Number,
        required : true,
        trim : true
    },
    bookingStatus : {
        type : String,
        default : "Not confirmed"
    }
});

// Exporting bookings model
module.exports = mongoose.model("Bookings", bookingSchema);

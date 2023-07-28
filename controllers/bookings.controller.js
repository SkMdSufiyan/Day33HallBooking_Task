const bookingsModel = require('../models/bookings.model.js');
const roomsModel = require('../models/rooms.model.js');

// Task-2 function (booking a room)
exports.bookRoom = async (req, res) => {
    try{
        let payload = req.body;
        const selectedRoomName = payload.roomName;

        let isValidRoom = true;
        let isRoomAvailable = true;
        let chosenRoomData = {};

        // Getting all rooms data to check whether the roomName given by user is a valid room and if it is valid then to check whether the room is already booked
            const allRoomsData = await roomsModel.find();
            const selectedRoomData = allRoomsData.filter(val => val.roomName == selectedRoomName)[0];

            if(!selectedRoomData){
                // If there is no room at all with that roomName (invalid room)
                isValidRoom = false;
            }else{
                // If the user has given a valid room name
                // Checking whether the room is already booked
                if(selectedRoomData.status=="Booked"){
                    // If the room is already booked
                    isRoomAvailable = false;
                }  
            }

        if(!isValidRoom){
            // If the room is invalid---return response
            return res.status(400).send({message: "Please select a valid room."});
        }else{
            if(!isRoomAvailable){
                // If the room is valid but is already booked---return response
                return res.status(401).send({message: `${selectedRoomName} is already booked. Please select another room.`})
            }else{
                // If the room name is valid and that room is available
                const stayHours = Number(payload.stayHours);
                const stayTimeMilliSeconds = 3600000 * Number(stayHours);

                const startTimeStamp = new Date();
                const currentDateString = startTimeStamp.toDateString();

                const currentTime = startTimeStamp.getTime();    

                const endTimeStamp = new Date( currentTime + stayTimeMilliSeconds);

                const startTimeStampString = startTimeStamp.toISOString();
                const endTimeStampString = endTimeStamp.toISOString();

                payload = {...payload, "bookingDate" : currentDateString, "startTime" : startTimeStampString, "endTime" : endTimeStampString, "bookingStatus" : "Confirmed" };

                chosenRoomData = selectedRoomData;
                // Changing the status of the selected room
                chosenRoomData.status = "Booked";
                // Updating the status of the selected room in "rooms" collection of database
                await roomsModel.findOneAndUpdate({_id : chosenRoomData._id.toString()}, {$set: chosenRoomData});

                // Creating a new booking
                const newBooking = new bookingsModel(payload);

                await newBooking.save()
                .then((result) => {
                    res.status(200).send({message: "Room has been booked successfully.", bookingDetails: result});
                })
                .catch((err) => {
                    res.status(404).send({message: "Error while booking the room", error: err.message});
                })
                
            }
        }

    }catch(error){
        res.status(500).send({message: "Internal server error", err:error.message});
    }

}


// Task-3 function (Listing all rooms with booked data)
exports.listAllBookedRoomsData = async (req, res) => {
    try{
        // Getting all bookings data
        await bookingsModel.find()
        .then((result) => {

            const bookedRoomsDat = result.map(doc => {
                const newDat = {
                    "roomName" : doc.roomName,
                    "bookedStatus" : "Booked",
                    "customerName" : doc.customerName,
                    "bookingDate" : doc.bookingDate,
                    "startTime" : doc.startTime,
                    "endTime" : doc.endTime
                };
                return newDat;
            });
            // Returning the required data
            res.status(200).send({message: "Listing all rooms with booked data", data: bookedRoomsDat});
        })
        .catch((err) => {
            res.status(400).send({message: "Failed to list all rooms with booked data."})
        })

    }catch(error){
        res.status(500).send({message: "Internal server error", error: error.message});
    }

}



// Task-4 function (listing all customers with booked data)
exports.getCustomersBookedData = async (req, res) => {
    try{
        // Getting all bookings data
        await bookingsModel.find()
        .then((result) => {
            let customersList = [];
            let customersBookedDat = [];
            
            for(doc of result){
                if(!customersList.includes(doc.customerName)){
                    const newDat = {
                                    "customerName" : doc.customerName,
                                    "bookedData" : [
                                                    {
                                                        "roomName" : doc.roomName,
                                                        "bookingDate" : doc.bookingDate,
                                                        "startTime" : doc.startTime,
                                                        "endTime" : doc.endTime
                                                    }
                                                    ]
                                    };
                       
                    customersList.push(doc.customerName);
                    customersBookedDat.push(newDat);  

                }else{
                    const newDat = {
                                    "roomName" : doc.roomName,
                                    "bookingDate" : doc.bookingDate,
                                    "startTime" : doc.startTime,
                                    "endTime" : doc.endTime
                                    };
                    const requiredIndex = customersList.indexOf(doc.customerName);
                    
                    customersBookedDat[requiredIndex]["bookedData"].push(newDat);
                }

            }
            // Returning the required data
            res.status(200).send({message: "Listing all bookings of customers.", data: customersBookedDat});
        })
        .catch((err) => {
            res.status(400).send({message: "Failed to list all bookings of customers.", error: err.message})
        })


    }catch(error){
        res.status(500).send({message: "Internal server error", error: error.message});
    }

}



// Task-5 function (listing how many times a customer booked the room with below details)
exports.getHowManyTimesCustomerBooked = async (req, res) => {
    try{
        // Getting all bookings data
        await bookingsModel.find()
        .then((result) => {
            let customersList = [];
            let customersBookedDat = [];
            
            for(doc of result){
                if(!customersList.includes(doc.customerName)){
                    const newDat = {
                                    "customerName" : doc.customerName,
                                    "howManyTimesBookedRoom" : 0,
                                    "bookedData" : [
                                                    {
                                                        "roomName" : doc.roomName,
                                                        "bookingDate" : doc.bookingDate,
                                                        "startTime" : doc.startTime,
                                                        "endTime" : doc.endTime,
                                                        "bookingId" : doc._id.toString(),
                                                        "bookingStatus" : doc.bookingStatus
                                                    }
                                                    ]
                                    };
                       
                    customersList.push(doc.customerName);
                    customersBookedDat.push(newDat);  

                }else{
                    const newDat = {
                                    "roomName" : doc.roomName,
                                    "bookingDate" : doc.bookingDate,
                                    "startTime" : doc.startTime,
                                    "endTime" : doc.endTime,
                                    "bookingId" : doc._id.toString(),
                                    "bookingStatus" : doc.bookingStatus
                                    };
                    const requiredIndex = customersList.indexOf(doc.customerName);
                    
                    customersBookedDat[requiredIndex]["bookedData"].push(newDat);
                }
            }

            const newCustomersBookedDat = customersBookedDat.map(val => {
                val.howManyTimesBookedRoom = val["bookedData"].length;
                return val;
            });
            // Returning the required data
            res.status(200).send({message: "Listing how many times each customer booked room.", data: newCustomersBookedDat});
        })
        .catch((err) => {
            res.status(400).send({message: "Failed to list how many each customer booked room.", error: err.message})
        })


    }catch(error){
        res.status(500).send({message: "Internal server error", error: error.message});
    }

}
const roomsModel = require('../models/rooms.model.js');

//  Task-1 function (creating a room)
exports.createRoom = async (req, res) => {
    try{
        const payload = req.body;
       
        // Getting all rooms data to check whether the roomName supplied by user is already created (existing)
        const allRommsData =  await roomsModel.find();
        // Filetring ooms with the roomName as that supplied by user
        const isNameAlreadyCreated = allRommsData.filter(doc=>doc.roomName==payload.roomName);

        // If the roomName is already existing------then return response
        if(isNameAlreadyCreated.length != 0){
            return res.status(401).send({message: `Room with name ${payload.roomName} is already created. Please give some other roomName.`})
        }

        // If the roomName is not existing------then create a new room
        const newRoom = new roomsModel(payload);

        // Creating room
        await newRoom.save()
        .then((result) => {
            res.status(200).send({message: "Room has been created successfully.", data: result});
        })
        .catch((err) => {
            res.status(400).send({message: "Failed to create room", error: err.message});
        })

    }catch(error){
        res.status(500).send({message: "Internal server error", error: error.message});
    }
}



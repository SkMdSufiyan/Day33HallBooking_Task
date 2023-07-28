const mongoose = require('mongoose');

// Function for establishing database connection
const database = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB connection established");
    }catch(error){
        console.log("Error: ", error);
    }
};

module.exports = database;
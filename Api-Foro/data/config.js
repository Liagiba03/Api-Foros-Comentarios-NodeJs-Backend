const mongoose = require('mongoose');
require('dotenv').config();

//Cargar variables de entorno
const url = process.env.URL;

const connectDB = async (callback) =>{
    try {
        await mongoose.connect(url);
        console.log("Database connect :)");
        callback();
    } catch (error) {
        console.log("Error connecting to the database");
        console.log(error);
        
    }
}

module.exports = connectDB;
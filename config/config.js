require('dotenv').config();

const config = {
    enviroment: process.env.NODE_ENV || "development",
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI,
}

module.exports = config;
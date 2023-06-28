require('dotenv').config();

const config = {
    enviroment: process.env.NODE_ENV || "development",
    port: process.env.PORT
}

module.exports = config 
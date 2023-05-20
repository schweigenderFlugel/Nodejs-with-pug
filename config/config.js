require('dotenv').config();

const config = {
    enviroment: process.env.ENV || "development",
    port: process.env.PORT
}

module.exports = config 
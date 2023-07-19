require('dotenv').config();

const config = {
    enviroment: process.env.NODE_ENV || "development",
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_ACCESS_REFRESH,
    gmailAddress: process.env.GMAIL_ADDRESS,
    gmailPassword: process.env.GMAIL_PASSWORD
}

module.exports = config;
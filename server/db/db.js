const mongoose = require('mongoose');

const dbConnetion = () => {
    mongoose.connect(process.env.DB_URI).then(res => {
        console.log("DB Connected Successfully", res.connection.host);
    })
} 

module.exports = dbConnetion;
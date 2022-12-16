const mongoose = require('mongoose')
const CONFIG = require('../config/config')


function connectToDB(){
    mongoose.set('strictQuery', false);
    
    mongoose.connect(CONFIG.MONGODB_URL)


    mongoose.connection.on("connected", () => {
        console.log('mongodb connected succesfully')
    })  

    mongoose.connection.on("error", (err) => {
        console.log('An error occured')
        console.log(err)
    })
}

module.exports = connectToDB
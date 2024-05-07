const mongoose = require('mongoose');

const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Datbase connected");
    }
    catch(error){
        console.log("An error occured while connecting to a database",err);
        process.exit(1)
    }
}

module.exports = {connectToDB}
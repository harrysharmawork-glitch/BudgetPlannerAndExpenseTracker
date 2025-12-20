const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected Successfully!! ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Mongodb connection failed!",error);
        process.exit(1);
    }
}
 
module.exports = connectDB;
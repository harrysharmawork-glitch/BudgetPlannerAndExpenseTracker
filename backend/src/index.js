const connectDB = require('./config/database');
const app = require('./app');
require('dotenv').config();

const startServer = async()=>{
    try{
        await connectDB();
        app.on("error", (error)=>{
            console.log("ERROR OCCURED", error);
            throw error;
        });

        const port = process.env.PORT || 8080 || 8085;
        app.listen(port, ()=>{
            console.log(`Server is running on http://localhost:${port}`);
        });
    }catch(error){
        console.log("Connection Failed",error)
    }
}

startServer();
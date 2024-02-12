const mongoose = require('mongoose')
const connectionString = process.env.connectionString

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connection established with MongoDB Atlas");
    }
).catch((err)=>{
    console.log("Connection establishment failed with MongoDB Atlas",err);
})
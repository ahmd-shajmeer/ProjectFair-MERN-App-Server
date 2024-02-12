require('dotenv').config() //Loads .env file contents into process.env by default.
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
require('./DB/connection')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json()) // application specific middleware - invokes whenever
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Server is now online at port : ${PORT}`);
})

pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1 style=color:blue>Project Fair server is online!! Waiting for client request...</h1>")
})

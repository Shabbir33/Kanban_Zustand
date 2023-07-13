if(process.env.NODE_ENV != "PRODUCTION"){
    require("dotenv").config()
}

const express = require("express")
const connectDB = require("./db/connect")

const app = express()

const PORT = 5000


const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)   
    }
}

start()
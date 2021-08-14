import express from "express"
import { interviewRouter } from './routes/interviewRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'


// App Config

const app = express();
dotenv.config()

// Middleware
app.use(express.json())
app.use(cors())
app.use('/interview', interviewRouter)

// Database Config

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_DATA_BASE}`,
// mongoose.connect("mongodb://mongo:27017/pixie",

    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Console Error:'))
db.once('open', () => console.log(`App connected to "${db.name}" database`))


// Server Config
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})

server.on("error", (err: Error) => {
    console.log("Error on connection:", err)
})


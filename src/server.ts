import express from "express"
import { interviewRouter } from './routes/interviewRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv'



// App Config

const app = express();
dotenv.config()

// Middleware

app.use(express.json())
app.use('/interview', interviewRouter)


// Database Config

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_DATA_BASE}`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Console Error:'))
db.once('open', () => console.log(`App connected to "${db.name}" database`))


// Server Config

const server = app.listen(8080, () => {
    console.log("App running on port 8080")
})

server.on("error", (err: Error) => {
    console.log("Error on connection:", err)
})

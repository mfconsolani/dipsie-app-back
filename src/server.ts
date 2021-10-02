import mongoose from 'mongoose';
import dotenv from 'dotenv'
import * as config from './config'
import app from './app';

dotenv.config()

// Database Config

mongoose.connect(
    config.MONGODB_URI,
// mongoose.connect("mongodb://mongo:27017/pixie",

    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })

mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Console Error:'))
db.once('open', () => console.log(`App connected to "${db.name}" database`))


// Server Config
const PORT = process.env.NODE_ENV === 'development' ? 5000 : 8080

export const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})

server.on("error", (err: Error) => {
    console.log("Error on connection:", err)
})


import express from "express"
import { Server } from "http";

const app = express();



const server: Server = app.listen(8080, () => {
    console.log("App running on port 8080")
})

server.on("error", (err: Error) => {
    console.log("Error on connection:", err)
})
import express from "express"
import { interviewRouter, userRouter } from './routes';
import cors from 'cors'

// App Config

const app = express();

// Middleware

app.use(express.json())
app.use(cors())
app.use('/interview', interviewRouter)
app.use('/user', userRouter)

export default app;
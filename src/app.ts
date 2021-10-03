import express from "express"
import { interviewRouter, userRouter } from './routes';
import cors from 'cors'

// App Config

const app = express();

// Middleware

app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  //@ts-ignore
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors())
app.use('/interview', interviewRouter)
app.use('/user', userRouter)

export default app;
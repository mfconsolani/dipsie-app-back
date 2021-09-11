import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI = process.env.NODE_ENV === "development" 
? `mongodb://127.0.0.1:27017/${process.env.MONGODB_DEV}`
: `mongodb://127.0.0.1:27017/${process.env.MONGODB_TEST}`


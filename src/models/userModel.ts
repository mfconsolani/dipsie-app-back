import mongoose, { Schema } from 'mongoose';
import { candidateSchema } from './candidateModel';

const userSchema = new Schema({
    username: String,
    email: String,
    picture: String,
    role: String,
    candidates:[candidateSchema]
})

export const User = mongoose.model('User', userSchema)

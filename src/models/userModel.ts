import mongoose, { Schema } from 'mongoose';
import { candidateSchema } from './candidateModel';

//console.log(p.id); // '50341373e894ad16347efe01'

const userSchema = new Schema({
    username: String,
    email: String,
    picture: String,
    role: String,
    candidates:[candidateSchema]
})

export const User = mongoose.model('User', userSchema)



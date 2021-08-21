import mongoose, { Schema } from 'mongoose';
import { candidateSchema } from './candidateModel';
import { UserInterface } from "./interfaces/userModelInterface";
import { CandidateInterface  } from "./interfaces/candidateModelInterface";

//console.log(p.id); // '50341373e894ad16347efe01'

const userSchema = new Schema<UserInterface>({
    username: String,
    email: {
        type: String,
        unique: true 
    },
    pictureUrl: String,
    role: String,
    candidates:{
        type: [candidateSchema],
        sparse: true
    }
})

export const User = mongoose.model<UserInterface>('User', userSchema)



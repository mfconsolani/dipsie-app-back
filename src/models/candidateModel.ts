import mongoose, { Schema }  from "mongoose";
import { CandidateInterface  } from "./interfaces/candidateModelInterface";
import { interviewSchema } from './interviewModel';

const candidateSchema = new Schema({
    candidateName: {
        type: String,
        required: true
    },
    candidateId: {
        type: Number,
        unique: true
    },
    candidateInfo: {
        type: [interviewSchema],
        required: true
    }
}) 

export const Candidate = mongoose.model<CandidateInterface>('Candidato', candidateSchema);


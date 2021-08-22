import mongoose, { Schema }  from "mongoose";
import { CandidateInterface  } from "./interfaces/candidateModelInterface";
import { interviewSchema } from './interviewModel';

export const candidateSchema = new Schema<CandidateInterface>({
    candidateName: {
        type: String,
        required: true
    },
    candidateId: {
        type: Number,
        required: true,
        // unique: true,
        sparse: true
    },
    candidateInfo: {
        type: [interviewSchema],
        required: false
    },
    availableNow: Boolean,
    mainSkills: String
}) 


export const Candidate = mongoose.model<CandidateInterface>('Candidato', candidateSchema);


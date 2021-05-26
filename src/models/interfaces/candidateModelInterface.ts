import { Document }  from "mongoose";
import { InterviewInterface } from './interviewModelInterface'

export interface CandidateInterface extends Document {
    candidateName: string;
    candidateId: number;
    candidateInfo: [InterviewInterface];
    availableNow: boolean,
    mainSkills: string
  }
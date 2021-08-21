import { InterviewInterface } from './interviewModelInterface'

export interface CandidateInterface {
    candidateName: string;
    candidateId: number;
    candidateInfo: [InterviewInterface];
    availableNow: boolean,
    mainSkills: string,
  }
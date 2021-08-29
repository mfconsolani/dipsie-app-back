import { CandidateInterface } from './candidateModelInterface'

export interface UserInterface{
    sername: string,
    email: string,
    role: string | string[],
    candidates: [CandidateInterface]
  }
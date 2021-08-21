import { CandidateInterface } from './candidateModelInterface'

export interface UserInterface{
    sername: string,
    email: string,
    pictureUrl: string,
    role: string,
    candidates: [CandidateInterface]
  }
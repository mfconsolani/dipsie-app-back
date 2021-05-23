import { Document }  from "mongoose";


export interface InterviewInterface extends Document {
    currentSituation: string,
    motivationToChange: string,
    freelanceOrPerm: string,
    inermediaries: string,
    yearsInSap: string,
    coreModule: string,
    fullCycleImp: string,
    hanaExperience: string,
    referencias: boolean,
    englishLevel: string,
    dailyRate: string,
    availability: string,
    interviewAvail: string,
    otherProcess: string,
    counteroffer: string,
    fullname: string,
    birthday: string,
    permInAccenture: string,
    otherProvider: string,
    postSavingDate: Date
  }
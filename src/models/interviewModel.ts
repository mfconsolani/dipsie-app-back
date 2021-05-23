import mongoose, { Schema } from 'mongoose';
import {InterviewInterface} from './interfaces/interviewModelInterface';

export const interviewSchema = new Schema({
    currentSituation: String,
    motivationToChange: String,
    freelanceOrPerm: String,
    inermediaries: String,
    yearsInSap: String,
    coreModule: String,
    fullCycleImp: String,
    hanaExperience: String,
    referencias: String,
    englishLevel: {
        type: String,
        required: true
    },
    dailyRate: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    interviewAvail: {
        type: String,
        required: true
    },
    otherProcess: {
        type: String,
        required: true
    },
    counteroffer: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    permInAccenture: {
        type: String,
    },
    otherProvider: String,
    postSavingDate: {
        type: Date,
        default: Date.now
    }

})


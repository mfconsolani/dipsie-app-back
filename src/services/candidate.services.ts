import { User } from "../models/userModel";
import { Candidate } from "../models/candidateModel";

export const isCandidateInUser = async (
  userEmail: any, 
  candidateId: any) => {
  return await User.find({
    email: userEmail,
    "candidates.candidateId": candidateId,
  });
};

export const updateCandidateInfo = async (
  userEmail: any,
  candidateInfo: any
) => {
  const { candidateId, availableNow, mainSkills, info } = candidateInfo;

  return await User.updateOne(
    {
      email: userEmail,
      "candidates.candidateId": candidateId,
    },
    {
      $set: {
        "candidates.$.availableNow": availableNow,
        "candidates.$.mainSkills": mainSkills,
      },
      $push: { "candidates.$.candidateInfo": info },
    }
  );
};

export const saveNewCandidate = async (candidateInfo:any) => {
  
  return new Candidate({
    candidateName: candidateInfo.candidate,
    candidateId: candidateInfo.id,
    candidateInfo: candidateInfo.info,
    availableNow: candidateInfo.availableNow,
    mainSkills: candidateInfo.mainSkills,
  });

}
import { User } from "../models/userModel";
import { Candidate } from "../models/candidateModel";

export const isCandidateInUser = async (userEmail: any, candidateId: any) => {
  return await User.find({
    email: userEmail,
    "candidates.candidateId": parseInt(candidateId),
  });
};

export const updateCandidateInfo = async (
  userEmail: any,
  candidateInfo: any
) => {
  const { id, availableNow, mainSkills, info } = candidateInfo;
  const updateCandidate = await User.updateOne(
    {
      email: userEmail,
      "candidates.candidateId": id,
    },
    {
      $set: {
        "candidates.$.availableNow": availableNow,
        "candidates.$.mainSkills": mainSkills,
      },
      $push: { "candidates.$.candidateInfo": info },
    }
  );
  if (updateCandidate.n !== 0){
    return updateCandidate
  } else {
    throw new Error("Error when saving candidate's information") 
  }
};

export const createNewCandidate = async (candidateInfo: any) => {
  return new Candidate({
    candidateName: candidateInfo.candidate,
    candidateId: candidateInfo.id,
    candidateInfo: candidateInfo.info,
    availableNow: candidateInfo.availableNow,
    mainSkills: candidateInfo.mainSkills,
  });
};

export const pushCandidateIntoUser = async (userEmail: any, candidate: any) => {
  const saveCandidate = await User.updateOne(
    {
      email: userEmail,
    },
    {
      $push: { candidates: candidate },
    }
  );

  if (saveCandidate.n !== 0){
    return saveCandidate
  } else {
    throw new Error("Error when saving candidate's information") 
  }
};

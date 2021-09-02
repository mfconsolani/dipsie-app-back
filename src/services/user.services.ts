import { User } from "../models/userModel";

export const isUserInDb = async (email:any) => {
    return await User.find({ email: email }).lean();
}

export const createNewUser = async (request: any) => {
  const { username, email, role, candidates } = request;

  const newUser = await new User({
    username,
    email,
    role,
    candidates: candidates
      ? {
          candidateName: candidates.candidate,
          candidateId: candidates.id,
          candidateInfo: candidates.info,
          availableNow: candidates.availableNow,
          mainSkills: candidates.mainSkills,
        }
      : [],
  }).save();

  return newUser    
}
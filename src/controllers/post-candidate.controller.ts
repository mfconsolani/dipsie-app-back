import { Request, Response } from "express";
import {
  isCandidateInUser,
  createNewCandidate,
  updateCandidateInfo,
  pushCandidateIntoUser,
} from "../services/candidate.services";

export const postCandidate = async (req: Request, res: Response) => {
  // @ts-ignore
  const userEmail = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
  let { candidate, id, info } = req.body;
  const candidateInDb = await isCandidateInUser(userEmail, id);
  if (candidateInDb.length > 0) {
    try {
      const candidateUpdate = await updateCandidateInfo(userEmail, req.body);
      res
        .status(200)
        .json({ "Candidate update succedded": { candidate, id, info } });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  } else {
    try {
      const candidateCreated = await createNewCandidate(req.body);
      // evaluar si es mejor usar upsert
      const candidateSavedToDb = await pushCandidateIntoUser(userEmail,candidateCreated);
      res.status(200).json({ "Candidate created": { candidate, id } });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        Error: "Error when saving new candidate's information",
        errmsg: err,
      });
    }
  }
};

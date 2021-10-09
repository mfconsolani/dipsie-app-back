import { Request, Response } from "express";
import {
  isCandidateInUser,
  createNewCandidate,
  updateCandidateInfo,
  pushCandidateIntoUser,
} from "../services/candidate.services";

const postCandidate = async (req: Request, res: Response) => {
  // console.log(req)
  // @ts-ignore
  const userEmail = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
  let { candidate, id, info } = req.body;
  
  try {
      const candidateInDb = await isCandidateInUser(userEmail, id);
      if (candidateInDb.length > 0) {
          const candidateUpdate = await updateCandidateInfo(userEmail, req.body);
          res
            .status(200)
            .json({ "Candidate update succedded": { candidate, id, info } });
      } else {
          const candidateCreated = await createNewCandidate(req.body);
          // evaluar si es mejor usar upsert
          const candidateSavedToDb = await pushCandidateIntoUser(userEmail,candidateCreated);
          res.status(200).json({ "Candidate created": { candidate, id } });
      }
    } catch (err){
      res.status(500).send(err)
    }
};

export default postCandidate
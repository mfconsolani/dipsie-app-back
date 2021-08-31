import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Candidate } from "../models/candidateModel";
import {
  isCandidateInUser,
  saveNewCandidate,
  updateCandidateInfo,
} from "../services/candidate.services";

async (req: Request, res: Response) => {
  // @ts-ignore
  const userEmail = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
  console.log(userEmail);
  let { candidate, id, info, availableNow, mainSkills } = req.body;
  id = parseInt(id);
  // const candidateInDb = await User.find({
  //   email: userEmail,
  //   "candidates.candidateId": id,
  // });

  //HAY QUE PROBAR ESTO
  const candidateInDb = await isCandidateInUser(userEmail, id);
  // console.log(candidateInDb)
  if (candidateInDb.length > 0) {
    //   const updateCandidateInfo = await User.updateOne(
    //     {
    //       email: userEmail,
    //       "candidates.candidateId": id,
    //     },
    //     {
    //       $set: {
    //         "candidates.$.availableNow": availableNow,
    //         "candidates.$.mainSkills": mainSkills,
    //       },
    //       $push: { "candidates.$.candidateInfo": info },
    //     }
    //   );

    //HAY QUE PROBAR ESTO
    const candidateUpdate = await updateCandidateInfo(userEmail, req.body);
    console.log("Info updated", candidate, id);
    res
      .status(200)
      .json({ "Candidate update succedded": { candidate, id, info } });
  } else {
    //HAY QUE PROBAR ESTO
    const candidateSaved = saveNewCandidate(req.body)
    // const candidateLoaded = new Candidate({
    //   candidateName: candidate,
    //   candidateId: id,
    //   candidateInfo: info,
    //   availableNow: availableNow,
    //   mainSkills: mainSkills,
    // });

    try {
      // evaluar si es mejor usar upsert
      const saveCandidateInUser = await User.updateOne(
        {
          email: userEmail,
        },
        {
          $push: { candidates: candidateSaved },
        }
      );

      console.log("Candidato agregado", saveCandidateInUser);
      saveCandidateInUser
        ? res.status(200).json({ "Candidate created": { candidate, id } })
        : res
            .status(400)
            .json({ Error: "No se ha creado ni modificado información" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
};

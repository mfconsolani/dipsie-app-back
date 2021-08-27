import { Router, Request, Response } from "express";
import { Candidate } from "../models/candidateModel";
import { checkJwt } from "../middleware/authz.middleware";
import { checkPermissions } from "../middleware/permissions.middleware";
import { CandidatePermission } from "../candidates/candidate-permission";
import { User } from "../models/userModel";
import dotenv from "dotenv";

dotenv.config();

export const interviewRouter = Router();
interviewRouter.use(checkJwt);

interviewRouter.get("/", (req: Request, res: Response) => {
  res.send("interview endpoint");
});

interviewRouter.post("/user", async (req: Request, res: Response) => {
  let { username, email, pictureUrl, role, candidates } = req.body;

  try {
    const newUser = await new User({
      username,
      email,
      pictureUrl,
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
    const alreadyInDb = await User.find({ email: email }).lean();
    console.log(alreadyInDb);
    res.json({ user: alreadyInDb });
  } catch (err: any) {
    console.log(err.errmsg);
    res.status(400).send(err.errmsg);
  }
});

interviewRouter.post(
  "/",
  checkPermissions(CandidatePermission.CreateCandidate),
  async (req: Request, res: Response) => {
    // @ts-ignore
    const userEmail = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
    console.log(userEmail)
    let { candidate, id, info, availableNow, mainSkills } = req.body;
    id = parseInt(id);
    const candidateInDb = await User.find({
      email: userEmail,
      "candidates.candidateId": id,
    });
    // console.log(candidateInDb)
    if (candidateInDb.length > 0) {
      const updateCandidateInfo = await User.updateOne(
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

      console.log("Info updated", candidate, id);
      res
        .status(200)
        .json({ "Candidate update succedded": { candidate, id, info } });
    } else {
      // console.log("inside else if");
      const candidateLoaded = new Candidate({
        candidateName: candidate,
        candidateId: id,
        candidateInfo: info,
        availableNow: availableNow,
        mainSkills: mainSkills,
      });
      // console.log(candidateLoaded);

      try {
        // evaluar si es mejor usar upsert
        const updateCandidateInfo = await User.updateOne(
          {
            email: userEmail,
          },
          {
            $push: { candidates: candidateLoaded },
          }
        );

        console.log("Candidato agregado", updateCandidateInfo);
        updateCandidateInfo
          ? res.status(200).json({ "Candidate created": { candidate, id } })
          : res
              .status(400)
              .json({ Error: "No se ha creado ni modificado información" });
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    }

    // const alreadyInDb = await Candidate.find({ candidateId: id });
    // if (alreadyInDb[0]) {
    //   const updateInfo = await Candidate.updateOne(
    //     { candidateId: id },
    //     {
    //       $set: { availableNow: availableNow, mainSkills: mainSkills },
    //       $push: { candidateInfo: info },
    //     }
    //   );
    //   console.log("User info updated");
    //   res.status(200).json(info);
    // } else if (id > 0) {
    //   const candidateLoaded = new Candidate({
    //     candidateName: candidate,
    //     candidateId: id,
    //     candidateInfo: info,
    //     availableNow: availableNow,
    //     mainSkills: mainSkills,
    //   });
    //   candidateLoaded.save((err: any, candidate: CandidateInterface) => {
    //     if (err) {
    //       console.log(err.message);
    //       return res.status(404).json({ Error: err.message });
    //     } else {
    //       console.log("User created properly");
    //       return res.status(201).json({
    //         Status: `Candidato creado: ${candidate.candidateName} ${candidate.candidateId}`,
    //       });
    //     }
    //   });
    // }
  }
);

interviewRouter.get("/inputFields", async (req: Request, res: Response) => {
  const schemaAttributes = await Candidate.schema.eachPath(function (
    path: any
  ) {
    return path;
  });
  console.log(
    Object.keys(schemaAttributes.obj),
    Object.keys(schemaAttributes.obj.candidateInfo.type[0].paths)
  );
  res.status(200).json({
    mainFields: Object.keys(schemaAttributes.obj),
    subFields: Object.keys(schemaAttributes.obj.candidateInfo.type[0].paths),
  });
});

interviewRouter.get(
  "/:idCandidato",
  checkPermissions(CandidatePermission.ReadCandidate),
  async (req: Request, res: Response) => {
    // @ts-ignore
    const userEmail = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
    const { idCandidato } = req.params;
    const infoCandidato = await User.aggregate([
      {
        $match: {
          email: userEmail,
        },
      },
      {
        $unwind: "$candidates",
      },
      {
        $match: {
          "candidates.candidateId": parseInt(idCandidato),
        },
      },
    ]);

    infoCandidato.length !== 0
      ? res.status(200).json({ Candidato: infoCandidato })
      : res.status(404).json({ Candidato: "Candidato no encontrado" });
  }
);

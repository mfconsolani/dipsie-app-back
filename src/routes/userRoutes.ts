import { Router, Request, Response } from 'express'
import { checkPermissions, checkJwt } from '../middleware';
import { CandidatePermission } from "../candidates/candidate-permission";
import { User } from "../models/userModel";

const userRouter = Router()
userRouter.use(checkJwt);

userRouter.post(
    "/",
    checkPermissions(CandidatePermission.CreateUser),
    async (req: Request, res: Response) => {
        console.log("inside /user")
      let { username, email, role, candidates } = req.body;
  
      const alreadyInDb = await User.find({ email: email }).lean();
  
      if (alreadyInDb.length > 0) {
        console.log("Usuario existente", alreadyInDb);
        return res.json({ "Usuario Existente": alreadyInDb });
      }
      try {
          console.log("inside try")
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
        console.log("Nuevo usuario creado", newUser);
        res.json({ "Usuario creado": newUser });
      } catch (err: any) {
        console.log("inside catch")
        console.log("Error", err);
        res.status(400).send(err);
      }
    }
  );

  export default userRouter
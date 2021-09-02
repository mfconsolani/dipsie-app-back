import { Router } from 'express'
import { checkPermissions, checkJwt } from '../middleware';
import { CandidatePermission } from "../candidates/candidate-permission";
import { postUser } from '../controllers/postUser.controller'

const userRouter = Router()
userRouter.use(checkJwt);

userRouter.post(
    "/",
    checkPermissions(CandidatePermission.CreateUser),
    postUser
  );

export default userRouter
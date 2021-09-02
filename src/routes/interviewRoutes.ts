import { Router, Request, Response } from "express";
import { checkJwt, checkPermissions } from "../middleware";
import { CandidatePermission } from "../candidates/candidate-permission";
import { postCandidate, getCandidate } from "../controllers";

const interviewRouter = Router();
interviewRouter.use(checkJwt);

interviewRouter.get("/", (req: Request, res: Response) => {
  res.send("interview endpoint");
});

interviewRouter.post(
  "/",
  checkPermissions(CandidatePermission.CreateCandidate),
  postCandidate
);

interviewRouter.get(
  "/:idCandidato",
  checkPermissions(CandidatePermission.ReadCandidate),
  getCandidate
);

export default interviewRouter
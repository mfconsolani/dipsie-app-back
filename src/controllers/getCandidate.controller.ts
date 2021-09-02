import { Request, Response } from 'express'
import { findCandidate } from '../services/candidate.services';

const getCandidate = async (req: Request, res: Response) => {
    // @ts-ignore
    const userEmail = req.user[`${process.env.AUTH0_AUDIENCE}/email`];
    const { idCandidato } = req.params;
    const infoCandidato = await findCandidate(userEmail, idCandidato)

    infoCandidato.length !== 0
      ? res.status(200).json({ Candidato: infoCandidato })
      : res.status(404).json({ Candidato: "Candidato no encontrado" });
  }

export default getCandidate 
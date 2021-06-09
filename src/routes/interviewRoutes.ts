import { Router, Request, Response } from 'express';
import { Candidate } from '../models/candidateModel';
import { CandidateInterface } from '../models/interfaces/candidateModelInterface';
import moment from 'moment'

export const interviewRouter = Router()

interviewRouter.get('/', (req: Request, res: Response) => {
    res.send('Interview screen')
});

interviewRouter.post('/', async (req: Request, res: Response) => {
    const { candidate, id, info, availableNow, mainSkills} = req.body
    const alreadyInDb = await Candidate.find({candidateId: parseInt(id)})
    if (alreadyInDb[0]){
        const updateInfo = await Candidate.updateOne({candidateId: parseInt(id)}, 
        {$set: {availableNow: availableNow, mainSkills: mainSkills}, $push: {candidateInfo: info} })
        console.log(alreadyInDb[0])
        // alreadyInDb.
        res.status(200).json({'Status': `Candidate info updated ${JSON.stringify(info)}`})
    } else {
        const candidateLoaded = new Candidate({
            candidateName: candidate,
            candidateId: id,
            candidateInfo: info,
            availableNow: availableNow,
            mainSkills: mainSkills
        })
        candidateLoaded.save( (err:any, candidate:CandidateInterface) => {
            if (err){
                console.error(err)
                return res.status(404).json({'Error': `${err.message}`})
            }
            res.status(201).json({
                'Status':`Información guardada: ${candidate.candidateName} ${candidate.candidateId}`
            })
        })
    }
})
interviewRouter.get('/inputFields', async (req: Request, res: Response) => {
    const mauro = await Candidate.schema.eachPath(function(path) {
        console.log(path);
    });
    console.log(Object.keys(mauro.obj), Object.keys(mauro.obj.candidateInfo.type[0].paths) )
    // const mauro = Object.keys(await Candidate.schema.path)
    // console.log(mauro)
    res.status(200).json({'fields':mauro.obj})

})

interviewRouter.get('/:idCandidato', async (req: Request, res: Response) => {
    const { idCandidato } = req.params
    console.log(idCandidato)
    const infoCandidato = await Candidate.find({candidateId: parseInt(idCandidato)})
    // let nestedInfo = infoCandidato[0].candidateInfo.postSavingDate    
    // console.log(moment(nestedInfo).format("DD-MM-YYYY"))
    infoCandidato.length > 0
    ? res.status(200).json({'Candidato': infoCandidato})
    : res.status(200).json({'Candidato': 'ID de candidato no encontrado'})
})

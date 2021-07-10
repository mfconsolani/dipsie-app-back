import { Router, Request, Response } from 'express';
import { Candidate } from '../models/candidateModel';
import { CandidateInterface } from '../models/interfaces/candidateModelInterface';
import moment from 'moment'
import { error } from 'console';

export const interviewRouter = Router()

interviewRouter.get('/', (req: Request, res: Response) => {
    res.send('Interview screen')
});

interviewRouter.post('/', async (req: Request, res: Response) => {
    let { candidate, id, info, availableNow, mainSkills} = req.body
    id = parseInt(id)
    const alreadyInDb = await Candidate.find({candidateId: id})
    if (alreadyInDb[0]){
        const updateInfo = await Candidate.updateOne({candidateId: id}, 
        {$set: {availableNow: availableNow, mainSkills: mainSkills}, $push: {candidateInfo: info} })
        console.log("User info updated")
        res.status(200).json(info)
    } else if (id > 0) {
        const candidateLoaded = new Candidate({
            candidateName: candidate,
            candidateId: id,
            candidateInfo: info,
            availableNow: availableNow,
            mainSkills: mainSkills
        })
        candidateLoaded.save( (err:any, candidate:CandidateInterface) => {
            if (err){
                console.log(err.message)
                return res.status(404).json({'Error': err.message})
            } else {                
                console.log('User created properly')
                return res.status(201).json({
                    'Status':`Información guardada: ${candidate.candidateName} ${candidate.candidateId}`
                })
            }
        })
    }
})
interviewRouter.get('/inputFields', async (req: Request, res: Response) => {
    const schemaAttributes = await Candidate.schema.eachPath(function(path:any) {
        return path;
    });
    console.log(
        Object.keys(schemaAttributes.obj), 
        Object.keys(schemaAttributes.obj.candidateInfo.type[0].paths))
    res.status(200).json({
        'mainFields':Object.keys(schemaAttributes.obj), 
        'subFields': Object.keys(schemaAttributes.obj.candidateInfo.type[0].paths)
    })

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

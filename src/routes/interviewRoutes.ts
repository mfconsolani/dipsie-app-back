import { Router } from 'express';

export const interviewRouter = Router()

interviewRouter.get('/', (req, res) => {
    res.send('Interview screen')
});

interviewRouter.post('/', (req, res) => {
    const { fullname, ...rest} = req.body
    console.log(fullname, rest);
    res.status(200).json({'status':`info received: ${fullname}`})
})
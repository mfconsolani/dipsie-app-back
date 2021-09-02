import { Request, Response } from 'express'
import { isUserInDb, createNewUser } from '../services/user.services'

export const postUser = async (req: Request, res: Response) => {
  console.log("inside /user");
  let { email } = req.body;

  const alreadyInDb = await isUserInDb(email)

  if (alreadyInDb.length > 0) {
    console.log("Usuario existente", alreadyInDb);
    return res.status(200).json({ "Usuario Existente": alreadyInDb });
  }
  try {
    console.log("inside try");
    const newUser = await createNewUser(req.body)
    console.log("Nuevo usuario creado", newUser);
    res.json({ "Usuario creado": newUser });
  } catch (err: any) {
    console.log("inside catch");
    console.log("Error", err);
    res.status(400).send(err);
  }
};


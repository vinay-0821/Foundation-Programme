import type { Request, Response } from 'express';
import { validateUser, generateToken, findUserByEmail, insertUser } from './authServices.ts';


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await validateUser(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user);
  return res.json({ user, token });
}

export async function signup(req: Request, res: Response) {
    console.log("signup  controller");
  try {
    console.log("Signup request body:", req.body);
    const { username, email, password, role, mobile} = req.body;

    const checkUser = await findUserByEmail(email);
    if (checkUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await insertUser(username, email, password, role, mobile);

    if (!newUser) {
        return res.status(500).json({ message: 'User could not be created' });
    }

    return res.status(201).json({ message: 'Signup successful', user: newUser });
  } 
  catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


export async function changepassword(req: Request, res: Response) {

}
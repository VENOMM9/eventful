import { Request, Response } from 'express';
import authService from '../services/authService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.status(200).redirect("/signup");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, country } = req.body;

  try {
    const user = await authService.createUser(first_name, last_name, email, password, country);
    res.status(302).redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default { login, createUser };

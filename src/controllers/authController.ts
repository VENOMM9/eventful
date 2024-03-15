import { Request, Response } from 'express';
import authService from '../services/authService';
import userModel from '../models/user';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    // Render a view instead of returning JSON
    res.render('loginSuccess', { success: true, message: "Login successful", token: token });
  } catch (error) {
    console.error(error);
    // Render a view for error handling
    res.render('error', { success: false, message: "Internal Server Error" });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, country } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      // Render a view for user already existing
      return res.render('userExists', { success: false, message: "User already exists" });
    }

    const { user, token } = await authService.createUser(first_name, last_name, email, password, country);

    console.log("New user created:", user);
    console.log("Token:", token);
    // Render a view for successful user creation
    res.render('userCreated', { success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    // Render a view for error handling
    res.render('error', { success: false, message: "Internal Server Error" });
  }
};



const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}


export default { login, createUser,  getAllUsers  };

import { Request, Response } from 'express';
import authService from '../services/authService';
import userModel from '../models/user';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    console.log(token)
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    // Redirect to dashboard route after successful login
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    // Check the error message to determine the type of error
    if (error === "User not found") {
      return res.render('usernotfound.ejs');
    } else if (error === "Invalid credentials") {
      return res.render('invalidinfo.ejs');
    } else {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};

const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, country } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.render('existinguser.ejs');
    }

    const { user, token } = await authService.createUser(first_name, last_name, email, password, country);

    console.log("New user created:", user);
    console.log("Token:", token);
    // Redirect to login route after successful user creation
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedData = req.body;
  try {
      const updatedUser = await authService.updateUserById(userId, updatedData);
      res.status(200).json({ success: true, message: "User updated successfully", updatedUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Assuming userId is passed as a route parameter
  try {
    const user = await authService.getUserById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "User not found" });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
      const deletedUser = await authService.deleteUserById(userId);
      res.status(200).json({ success: true, message: "User deleted successfully", deletedUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};


export default { login, createUser,  getAllUsers, getUserById,  updateUser, deleteUser  };

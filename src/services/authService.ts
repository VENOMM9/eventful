import userModel, { User } from '../models/user'; // Import the User type
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

class AuthService {
  public async createUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    country: string
  ) {
    try {
      const existingUser = await userModel.findOne({ email: email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const user = await userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        country: country,
      });

      const token = jwt.sign(
        { user: { first_name: user.first_name, email: user.email, _id: user._id } },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return { user, token };
    } catch (error) {
      console.log(error)
      throw new Error("User creation failed");
    }
  }

  public async login(email: string, password: string) {
    try {
      const user = await userModel.findOne({ email: email });

      if (!user) {
        throw new Error("User not found");
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { user: { first_name: user.first_name, email: user.email, _id: user._id } },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return token;
    } catch (error: any) {
      throw new Error("Authentication failed" + " " + error.message);
    }
  }

  public async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }

  public async getUserById(userId: string) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user by ID");
    }
  }

  public async updateUserById(userId: string, updatedData: Partial<User>) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  public async deleteUserById(userId: string) {
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}

export default new AuthService();

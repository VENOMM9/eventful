import userModel from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthService {
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

      const token = jwt.sign({ user: user }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return token;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

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

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        country: country,
      });

      return user;
    } catch (error) {
      throw new Error("User creation failed");
    }
  }
}

export default new AuthService();

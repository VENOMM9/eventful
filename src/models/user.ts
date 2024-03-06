import mongoose, { Schema, Document } from 'mongoose';
import shortid from 'shortid';
import bcrypt from 'bcrypt';

export interface User extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  country: string;
  profilePicture?: string;
  isValidPassword(password: string): Promise<boolean>; 

}

const userSchema: Schema<User> = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email address!`
    }
  },
  password: { type: String, required: true },
  country: { type: String, required: true },
  profilePicture: { type: String }
});

// Before save
userSchema.pre<User>('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  const user = this as User;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const userModel = mongoose.model<User>('User', userSchema);

export default userModel;

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional because OAuth users might not have a password, but we'll store hashed passwords here
    role: { type: String, required: true, default: 'user' },
    wishlist: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// During development, delete cached model to pick up schema changes after hot reload
if (process.env.NODE_ENV !== 'production') {
  delete mongoose.models.User;
}
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel } from '../types/models';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

// Index for better performance
userSchema.index({ email: 1, uid: 1 });

// Static method to find by email and UID
userSchema.statics.findByEmailAndUID = function (email: string, uid: string) {
  return this.findOne({
    email: email.toLowerCase().trim(),
    uid: uid.trim(),
  });
};

// Export the model
const User =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;

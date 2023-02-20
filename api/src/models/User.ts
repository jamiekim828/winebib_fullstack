import mongoose, { Document } from 'mongoose';

export type UserDocument = Document & {
  date: Date;
  userId: string;
  firstName: string;
  lastName: string;
  DOB: Date;
  email: string;
  password: string;
};

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<UserDocument>('User', UserSchema);

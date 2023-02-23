import mongoose, { Document } from 'mongoose';

export type UserDocument = Document & {
  date: Date;
  _id: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  _id: {
    type: Schema.Types.ObjectId,
  },
  userName: {
    type: String,
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
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<UserDocument>('User', UserSchema);

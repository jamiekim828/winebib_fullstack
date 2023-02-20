import User, { UserDocument } from '../models/User';

const getUserById = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const deleteUserById = async (id: string): Promise<UserDocument | null> => {
  return User.findByIdAndDelete(id);
};

const updateUser = async (
  id: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(id, update, { new: true });
};

const getUserList = async (): Promise<UserDocument[]> => {
  return User.find();
};

export default {
  getUserById,
  getUserList,
  createUser,
  deleteUserById,
  updateUser,
};

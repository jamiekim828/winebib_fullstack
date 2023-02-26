import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User';
import UserServices from '../services/user';
import { generateToken } from '../utils/generateToken';
import mongoose from 'mongoose';

export const logInWithPassword = async (
  request: Request,
  response: Response
) => {
  try {
    const userData = await UserServices.findUserByEmail(request.body.email);

    if (!userData) {
      response.json({ message: `"${request.body.email}" is not registered yet` });
      return;
    }

    const plainPassword = request.body.password;
    const passwordDatabase = userData.password;

    const match = await bcrypt.compare(plainPassword, passwordDatabase);
    
    if (!match) {
      response.status(400).json({ message: 'wrong password' });
      return;
    }

    const token = generateToken(userData.email);
    
    response.status(200).json({
      userData: {
        _id: userData._id,
        userName: userData.userName,
        email: userData.email,
        isAdmin: userData.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json('This email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      userName: req.body.userName,
      email: email,
      password: hashedPassword,
    });

    const user = await UserServices.createUser(newUser);

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      // token?
    });
  } catch (err) {
    res.status(500).json('Server error');
  }
};

export const getUserListController = async (req: Request, res: Response) => {
  try {
    const userList = await UserServices.getUserList();
    res.status(200).json(userList);
  } catch (err) {
    res.status(404).json('Users not found');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserServices.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json('User not found');
  }
};

export const updateUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const update = req.body;
    const user = await UserServices.getUserById(userId)

    if(!user) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(update.password, salt);
    
    const newUserInfo = {
      userName: update.username,
      password: hashedPassword,
      email: user.email,
    }

    const updateUser = await UserServices.updateUser(userId, newUserInfo);
    // .select
    // need to be fixed
    res.status(200).json(updateUser);
  } catch (err) {
    console.log(err)
    res.status(500).json('Server error');
  }
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deleteUser = await UserServices.deleteUserById(userId);
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(404).json('User not found');
  }
};

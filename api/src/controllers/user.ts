import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/User';
import UserServices from '../services/user';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const logInWithPassword = async (
  request: Request,
  response: Response
) => {
  try {
    // get user information from database
    const userData = await UserServices.findUserByEmail(request.body.email);
    // if no user data
    if (!userData) {
      response.json({ message: `cant find user email ${request.body.email}` });
      return;
    }
    console.log(userData);
    // if user -> check email and password match
    const token = jwt.sign(
      {
        email: request.body.email,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    response.json({
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
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json('This email exists');
    }

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
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
    res.status(500).json('server error');
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
    const updateUser = await UserServices.updateUser(userId, update);
    // .select
    // need to be fixed
    res.status(200).json(updateUser);
  } catch (err) {
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

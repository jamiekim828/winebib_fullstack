import { Request, Response } from 'express';

import User from '../models/User';
import UserServices from '../services/user';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await UserServices.createUser(newUser);
    res.status(200).json(user);
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

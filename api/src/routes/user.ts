import { Router } from 'express';
import passport from 'passport'

import {
  createUserController,
  getUserById,
  updateUserByIdController,
  deleteUserByIdController,
  getUserListController,
  logInWithPassword,
} from '../controllers/user';

const router = Router();

router.post('/', createUserController );
router.get('/:id', getUserById);
router.get('/', getUserListController)
router.delete('/:id', deleteUserByIdController);
router.post('/login', logInWithPassword)
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateUserByIdController
);

export default router;

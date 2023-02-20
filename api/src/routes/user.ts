import { Router } from 'express';

import {
  createUserController,
  getUserById,
  updateUserByIdController,
  deleteUserByIdController,
  getUserListController,
} from '../controllers/user';

const router = Router();

router.post('/', createUserController );
router.get('/:id', getUserById);
router.get('/', getUserListController)
router.delete('/:id', deleteUserByIdController);
router.put('/:id', updateUserByIdController);

export default router;

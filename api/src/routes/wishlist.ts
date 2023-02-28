import { Router } from 'express';
import passport from 'passport';

import {
  createWishlistController,
  getWishlistByUserIdController,
  deleteWishlistByIdController,
} from '../controllers/wishlist';

const router = Router()

router.post('/:userId', createWishlistController)
router.get('/:userId', getWishlistByUserIdController)
router.delete('/:userId/:priductId', deleteWishlistByIdController)

export default router
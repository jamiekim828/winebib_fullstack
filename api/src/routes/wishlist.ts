import { Router } from 'express';
import passport from 'passport';

import {
  createWishlistController,
  getWishlistByUserIdController,
  deleteWishlistByIdController,
} from '../controllers/wishlist';

const router = Router()

router.post('/:userId/:productId', createWishlistController)
router.get('/:userId', getWishlistByUserIdController)
router.delete('/:userId/:productId', deleteWishlistByIdController)

export default router
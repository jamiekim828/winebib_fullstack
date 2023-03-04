import { Router } from 'express';

import {
  createWishlistController,
  getWishlistByUserIdController,
  deleteWishlistByProductIdController
} from '../controllers/wishlist';

const router = Router()

router.post('/:userId/:productId', createWishlistController)
router.get('/:userId', getWishlistByUserIdController)
router.delete('/:userId/:productId', deleteWishlistByProductIdController)

export default router
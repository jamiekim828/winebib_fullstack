import { Router } from 'express';
import passport from 'passport';

import {
  createWishlistController,
  getWishlistByUserIdController,
  deleteWishlistByProductIdController,
} from '../controllers/wishlist';

const router = Router();

router.post(
  '/:userId/:productId',
  passport.authenticate('jwt', { session: false }),
  createWishlistController
);
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  getWishlistByUserIdController
);
router.delete(
  '/:userId/:productId',
  passport.authenticate('jwt', { session: false }),
  deleteWishlistByProductIdController
);

export default router;

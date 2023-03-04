import { Router } from 'express';
import passport from 'passport';

import {
  createOrderController,
  getOrderListByUserIdController,
  getOrderListController,
} from '../controllers/order';

const router = Router();

router.post(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  createOrderController
);
router.get('/', getOrderListController);
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  getOrderListByUserIdController
);

export default router;
import { Router } from 'express';
import passport from 'passport';

import {
  createOrderController,
  getOrderListByUserIdController,
  updateOrderByIdController,
  deleteOrderByIdController,
  getOrderListController,
} from '../controllers/order';

const router = Router();

router.post(
  '/:userId',
  createOrderController
);
router.get('/', getOrderListController);
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  getOrderListByUserIdController
);

// router.delete('/:id', deleteOrderByIdController);
// router.put('/:id', updateOrderByIdController);


export default router;

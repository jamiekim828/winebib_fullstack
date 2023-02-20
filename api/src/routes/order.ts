import { Router } from 'express';

import {
  createOrderController,
  getOrderListByUserIdController,
  updateOrderByIdController,
  deleteOrderByIdController,
} from '../controllers/order';

const router = Router();

router.post('/:userId', createOrderController);
router.get('/:userId', getOrderListByUserIdController);
router.delete('/:id', deleteOrderByIdController);
router.put('/:id', updateOrderByIdController);

export default router;

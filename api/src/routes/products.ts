import { Router } from 'express';

import {
  createProductController,
  getProductListController,
  updateProductByIdController,
  deleteProductByIdController,
} from '../controllers/products';

const router = Router();

router.post('/', createProductController);
router.get('/', getProductListController);
router.delete('/:productId', deleteProductByIdController);
router.put('/:productId', updateProductByIdController);

export default router;

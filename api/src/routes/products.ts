import { Router } from 'express';

import {
  createProductController,
  getProductListController,
  updateProductByIdController,
  deleteProductByIdController,
  getProductByIdController,
} from '../controllers/products';

const router = Router();

router.post('/', createProductController);
router.get('/', getProductListController);
router.get('/:productId', getProductByIdController)
router.delete('/:productId', deleteProductByIdController);
router.put('/:productId', updateProductByIdController);

export default router;

// product services
import Product, { ProductDocument } from '../models/Product';

// communicate with datebase
const createProduct = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return product.save();
};

const updateProductById = async (
  id: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  return Product.findByIdAndUpdate(id, update, { new: true });
};

const getProductList = async (): Promise<ProductDocument[]> => {
  return Product.find();
};

const deleteProductById = async (
  id: string
): Promise<ProductDocument | null> => {
  return Product.findByIdAndDelete(id);
};

export default {
  createProduct,
  updateProductById,
  getProductList,
  deleteProductById,
};

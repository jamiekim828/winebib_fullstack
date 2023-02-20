import { Request, Response } from 'express';

import Product from '../models/Product';
import ProductServices from '../services/products';

export const createProductController = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      country: req.body.country,
      flag: req.body.flag,
      region: req.body.region,
      capacity: req.body.capacity,
      use: req.body.use,
      grape: req.body.grape,
      pairing: req.body.pairing,
      color: req.body.color,
      sweet: req.body.sweet,
      accidity: req.body.accidity,
      price: req.body.price,
      image: req.body.image,
    });
    const product = await ProductServices.createProduct(newProduct);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json('server error');
  }
};

export const getProductListController = async (
  req: Request,
  res: Response
) => {
  try {
    const productList = await ProductServices.getProductList();
    res.status(200).json(productList);
  } catch (err) {
    res.status(404).json('Products not found');
  }
};

export const updateProductByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const update = req.body;
    const updateProduct = await ProductServices.updateProductById(
      productId,
      update
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json('Server error');
  }
};

export const deleteProductByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const deleteProduct = await ProductServices.deleteProductById(productId);
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(404).json('Product not found');
  }
};

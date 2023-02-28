import { Request, Response } from 'express';

import User from '../models/User';
import Wishlist from '../models/Wishlist';
import WishlistServices from '../services/wishlist';

export const createWishlistController = async (req: Request, res: Response) => {
  try {
    const wishData = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res
        .status(404)
        .json('Please login so we can save your wishlist data');
    }
    const newWish = new Wishlist({
      ...wishData,
      userId: user._id,
    });
    const wish = await WishlistServices.createWishlist(newWish);
    return res
      .status(200)
      .json({ wish, messaage: 'The product is saved in the wishlist' });
  } catch (err) {
    res.status(500).json('Server error');
  }
};

export const getWishlistByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json('No user by this userId');
    }
    const wishlist = await WishlistServices.getWishlistByUserId(userId);
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json('Server error');
  }
};

export const deleteWishlistByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    // /wishlist/:userId/:productId
    const userId = req.params.userId
    const productId = req.params.productID


  } catch (err) {}
};

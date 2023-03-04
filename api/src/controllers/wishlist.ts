import { Request, Response } from 'express';
import Product, { ProductDocument } from '../models/Product';

import User from '../models/User';
import Wishlist, { WishlistDocument } from '../models/Wishlist';
import WishlistServices from '../services/wishlist';

export const createWishlistController = async (req: Request, res: Response) => {
  try {
    const {userId, productId} = req.params
    
    const wishData = await Product.findById(productId)
    const user = await User.findById(userId);
    const existWishlist : WishlistDocument | null = await Wishlist.findOne({userId})

    if (!user) {
      return res
        .status(404)
        .json('Please login so we can save your wishlist data');
    }
    else if( !wishData) {
      return res.status(404).json('This product does not exist')
    }
    else if (!existWishlist) {
      const newWish = new Wishlist({
        userId: user._id,
        wishes: [wishData]
      });
      const wish = await WishlistServices.createWishlist(newWish)
      return res.status(200).json({wish, message:'The product is saved in the wishlist'}) 
    }
    const index = existWishlist.wishes.findIndex((item:ProductDocument)=> item._id.toString() === productId)
      if(index !== -1) {
        return res.status(200).json('Product exist');
      }
      if(index === -1) {
        existWishlist.wishes.push(wishData)
        const wish = await WishlistServices.createWishlist(existWishlist)
        return res.status(200).json({wish, message: 'The product is saved in the wishlist'})
      }

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

    const user = await User.findById(userId)
    if(!user) {
      return
    }
    


  } catch (err) {}
};

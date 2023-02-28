import Wishlist, { WishlistDocument } from '../models/Wishlist';

const createWishlist = async (
  wish: WishlistDocument
): Promise<WishlistDocument> => {
  return wish.save();
};

const getWishlistByUserId = async (id: string): Promise<WishlistDocument[]> => {
  return Wishlist.find({ userId: id });
};

const deleteWishlistByUserId = async (
  userIdFromReq: string, productIdFromReq: string
): Promise<WishlistDocument | null> => {
    // find user by userId
    // find product by productId from user's wishes
    // delete that product from the wishes
  return Wishlist.findByIdAndDelete();
};

export default {
  createWishlist,
  getWishlistByUserId,
  deleteWishlistByUserId,
};

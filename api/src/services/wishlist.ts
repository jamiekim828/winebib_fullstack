import Wishlist, { WishlistDocument } from '../models/Wishlist';

const createWishlist = async (
  wish: WishlistDocument
): Promise<WishlistDocument> => {
  return wish.save();
};

const getWishlistByUserId = async (id: string): Promise<WishlistDocument[]> => {
  return Wishlist.find({ userId: id });
};

export default {
  createWishlist,
  getWishlistByUserId,
};

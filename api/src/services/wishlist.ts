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
  id: string
): Promise<WishlistDocument | null> => {
  return Wishlist.findByIdAndDelete(id);
};

export default {
  createWishlist,
  getWishlistByUserId,
  deleteWishlistByUserId,
};

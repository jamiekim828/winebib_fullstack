import { ProductDocument } from '../models/Product';
import Wishlist, { WishlistDocument } from '../models/Wishlist';

const createWishlist = async (
  wish: WishlistDocument
): Promise<WishlistDocument> => {
  return wish.save();
};

const getWishlistByUserId = async (id: string): Promise<WishlistDocument[]> => {
  return Wishlist.find({ userId: id });
};

const deleteWishlistByProductId = async (data: ProductDocument): Promise<WishlistDocument[] | null> => {

  return Wishlist.findOneAndDelete()
};

export default {
  createWishlist,
  getWishlistByUserId,
  deleteWishlistByProductId
};

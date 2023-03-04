import Wishlist, { WishlistDocument } from '../models/Wishlist';

const createWishlist = async (
  wish: WishlistDocument
): Promise<WishlistDocument> => {
  console.log(wish)
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
    console.log(userIdFromReq, productIdFromReq, 'delete service')
    const wishlistByUser = Wishlist.findById(userIdFromReq)
  return wishlistByUser
};

export default {
  createWishlist,
  getWishlistByUserId,
  deleteWishlistByUserId,
};

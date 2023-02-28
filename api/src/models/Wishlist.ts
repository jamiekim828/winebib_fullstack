import mongoose, { Document } from 'mongoose';

import User from './User';
import { ProductSchema } from './Product';

export type WishlistDocument = Document & {
  userId: string;
  wishes: [];
};

const Schema = mongoose.Schema;
const WishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  wishes: [{ type: ProductSchema }],
});

export default mongoose.model<WishlistDocument>('Wishlist', WishlistSchema);

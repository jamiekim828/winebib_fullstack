import mongoose, { Document } from 'mongoose';

import User from './User';
import Product from './Product';

export type OrderDocument = Document & {
  date: Date;
  userId: string;
  address: string[];
  orders: [];
  isDelivered: boolean;
};

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  address: {
    type: [String],
  },
  orders: [{ type: Product.schema }],
  isDelivered: {
    type: Boolean,
  },
});

export default mongoose.model<OrderDocument>('Order', OrderSchema);

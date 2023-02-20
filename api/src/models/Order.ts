import mongoose, { Document } from 'mongoose';

import User from './User';
import Product from './Product';

export type OrderDocument = Document & {
  date: Date;
  userId: string;
  orders: [];
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
  orders: [{type: Product.schema}]
});
export default mongoose.model<OrderDocument>('Order', OrderSchema);

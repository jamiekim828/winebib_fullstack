import mongoose, { Document } from 'mongoose';

import User from './User';

export type OrderDocument = Document & {
  
  date: Date;
  userId: string;
  address: string;
  orders: [];
  total: number;
  isDelivered: string;
};

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  address: String,
  orders: [
    {
      productId: Schema.Types.ObjectId,
      name: String,
      image: String,
      price: Number,
      quantity: Number
    },
  ],
  total: Number,
  isDelivered: {
    type: String,
    enum: ['Prepare', 'shipped', 'Delivered'],
    default: 'Prepare',
  },
});

export default mongoose.model<OrderDocument>('Order', OrderSchema);

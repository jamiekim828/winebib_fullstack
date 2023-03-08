import mongoose, { Document } from 'mongoose';

import User from './User';

export type OrderDocument = Document & {
  date: Date;
  userId: string;
  address: [];
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
  address: [{
    city: {type: String, required: true},
    country: {type: String, required: true},
    houseNumber: {type: String, required: true},
    street: {type: String, required: true},
    userName: {type: String, required: true},
    zip: {type:String, required: true}
  }],
  orders: [
    {
      productId: Schema.Types.ObjectId,
      name: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: Number,
  isDelivered: {
    type: String,
    enum: ['Prepare', 'Shipped', 'Delivered'],
    default: 'Prepare',
  },
});

export default mongoose.model<OrderDocument>('Order', OrderSchema);

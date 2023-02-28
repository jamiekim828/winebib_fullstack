import mongoose, { Document } from 'mongoose';

export type ProductDocument = Document & {
  name: string;
  country: string;
  flag: string;
  region: string;
  vintage: number;
  capacity: number;
  use: string[];
  grape: string[];
  pairing: string[];
  color: string;
  sweet: number;
  accidity: number;
  price: number;
  image: string;
};

const Schema = mongoose.Schema;
export const ProductSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  flag: { type: String, required: true },
  region: { type: String, required: true },
  vintage: { type: Number },
  capacity: { type: Number, required: true },
  use: { type: [String] },
  grape: { type: [String], required: true },
  pairing: { type: [String], required: true },
  color: { type: String },
  sweet: { type: Number },
  accidity: { type: Number },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<ProductDocument>('Product', ProductSchema);

import { Schema, model, models, type Model, Types } from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  categoryId: Types.ObjectId;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", ProductSchema);



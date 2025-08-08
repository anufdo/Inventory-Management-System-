import { Schema, model, models, type Model } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema);



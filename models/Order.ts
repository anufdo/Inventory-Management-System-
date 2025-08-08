import { Schema, model, models, type Model, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number; // snapshot of price at order time
}

export interface IOrder {
  _id: string;
  customer?: string;
  items: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    customer: { type: String },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = models.Order || model<IOrder>("Order", OrderSchema);



import mongoose, { Schema, Document } from "mongoose";

export type OrderType = {
  payment_id: mongoose.Types.ObjectId;
  menu_id: mongoose.Types.ObjectId;
  menuItemImage: string;
  menuItemName: string;
  menuItemPrice: number;
  quantity: number;
  subtotal: number;
};

const OrderSchema: Schema = new Schema({
  payment_id: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
  menu_id: { type: Schema.Types.ObjectId, ref: "MenuModel", required: true },
  menuItemImage: { type: String, required: true },
  menuItemName: { type: String, required: true },
  menuItemPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

export const OrderModel = mongoose.model<OrderType>("Order", OrderSchema);

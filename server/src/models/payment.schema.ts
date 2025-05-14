import mongoose, { Schema, Document } from "mongoose";

export type PaymentType = {
  orderNumber: string;
  orderAmount: number;
  customerPaidAmount: number;
  customerChange: number;
  created_at: Date;
}

const PaymentSchema: Schema = new Schema({
  orderNumber: { type: String, required: true },
  orderAmount: { type: Number, required: true },
  customerPaidAmount: { type: Number, required: true },
  customerChange: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const PaymentModel = mongoose.model<PaymentType>("Payment", PaymentSchema);

import { ObjectId } from "mongodb";
import mongoose, { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
    paid: Boolean,
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);

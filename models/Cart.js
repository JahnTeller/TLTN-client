import mongoose, { model, Schema, models } from "mongoose";
const CartSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Cart = models?.Cart || model("Cart", CartSchema);

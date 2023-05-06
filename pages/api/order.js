import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handle(req, res) {
  await mongooseConnect();
  const orders = await Order.find({ user: req.query.userid });
  res.json(orders);
}

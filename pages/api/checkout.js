import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { name, email, address, phoneNumber, user, cartProducts } = req.body;
  await mongooseConnect();
  const products = cartProducts;
  let line_items = [];
  for (const product of products) {
    console.log(product);
    const quantity = product.quantity;
    line_items.push({
      quantity,
      price_data: {
        currency: "usd",
        product_data: { name: product.product.title },
        unit_amount: product.product.price * 100,
      },
    });
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    address,
    phoneNumber,
    user,
    paid: false,
  });
  console.log(orderDoc);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
}

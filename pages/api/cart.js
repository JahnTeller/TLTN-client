import { mongooseConnect } from "@/lib/mongoose";
import { Cart } from "@/models/Cart";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
  if (method === "PUT") {
    console.log("put");
    const checkExit = await Cart.find({
      $and: [{ productId: productId }, { userId: userId }],
    });
  }

  if (method === "GET") {
    const allcart = await Cart.find({ user: req.query.userid }).populate(
      "product"
    );
    res.json(allcart);
  }
  if (method === "DELETE") {
    const { user } = req.body;
    console.log("req:", req);
    const deletecart = await Cart.deleteMany({ user: req.query.userid });
    res.json(deletecart);
  }

  if (method === "POST") {
    const { user, product } = req.body;
    const cartProduct = await Cart.findOne({ product, user });
    if (!req.body.action) {
      if (cartProduct) {
        const updatedCart = await Cart.findOneAndUpdate(
          { _id: cartProduct._id },
          { $inc: { quantity: 1 } },
          { new: true }
        );
        console.log(updatedCart);
        res.json(updatedCart);
      } else {
        const cartdoc = await Cart.create({ user, product, quantity: 1 });
        console.log("create", cartdoc);
        res.json(cartdoc);
      }
    } else {
      if (cartProduct) {
        const updatedCart = await Cart.findOneAndUpdate(
          { _id: cartProduct._id },
          { $inc: { quantity: -1 } },
          { new: true }
        );
        console.log(updatedCart);
        res.json(updatedCart);
        if (updatedCart.quantity == 0) {
          await Cart.findByIdAndDelete(updatedCart._id);
        }
      }
    }
  }

  // if (method == "POST") {
  //   const { user, product } = req.body;
  //   if (user && product) {
  //     const cartdoc = await Cart.create({ user, product });
  //   } else {
  //     const allCart = await Cart.find({
  //       $and: [{ productId: productId }, { userId: userId }],
  //     });
  //     res.json(allCart);
  //   }
  // }
}

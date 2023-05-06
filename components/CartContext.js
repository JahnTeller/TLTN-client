import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [count, setCount] = useState(1);

  const { data: session, status } = useSession();
  useEffect(() => {
    getCart();
  }, [session, count]);
  console.log("status", status);
  async function addProduct(productId) {
    setCount(count + 1);
    const res = await axios.post("api/cart", {
      product: productId,
      user: session.user.id,
    });
    console.log("res", res.data.cartProduct);
  }
  const getCart = async () => {
    console.log("get cart now");
    if (session) {
      const res = await axios.get(`api/cart?userid=${session?.user?.id}`);
      setCartProducts(res.data);
    }
    //console.log("res 1s", res.data);
  };
  async function removeProduct(productId) {
    setCount(count - 1);
    const res = await axios.post("api/cart", {
      product: productId,
      user: session.user.id,
      action: "minus",
    });
    console.log("res", res.data.cartProduct);
  }
  async function clearCart(userId) {
    const res = await axios.delete(`api/cart?userid=${userId}`);
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

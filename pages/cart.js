import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useFormik } from "formik";
import { useSession, getSession } from "next-auth/react";
import LoginMessage from "@/components/LoginMessage";
import { get } from "mongoose";
import * as Yup from "yup";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 10px;
  display: block;

  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart, getCart } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  let totalPrice = 0;
  const { data: session } = useSession();
  useEffect(() => {}, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success") && session) {
      console.log(session.user.id);
      setIsSuccess(true);
      clearCart(session.user.id);
    }
  }, [session]);
  useEffect(() => {
    formik.values.email = session?.user?.email;
    formik.values.name = session?.user?.name;
    formik.values.user = session?.user?.id;
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment(name, email, address, phoneNumber, user) {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      address,
      phoneNumber,
      user,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  for (const cartProduct of cartProducts) {
    const price = cartProduct.product.price * cartProduct.quantity;
    totalPrice += price;
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phonenumber: "",
      total: total,
      user: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(23, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      address: Yup.string()
        .min(5, "Minimum 5 characters")
        .required("Required!"),
      phonenumber: Yup.string()
        .min(5, "Minimum 5 characters")
        .required("Required!"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      formik.values.total = totalPrice;
      goToPayment(
        formik.values.name,
        formik.values.email,
        formik.values.address,
        formik.values.phonenumber,
        formik.values.user
      );
    },
  });
  if (!session) {
    return <LoginMessage />;
  } else if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Cảm ơn vì đã đặt hàng</h1>
              <p>
                {" "}
                Chúng tôi sẽ liên hệ bạn qua Email sớm nhất để thông tin dơn
                hàng cho bạn
              </p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Giỏ hàng</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {cartProducts?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Sản Phẩm</th>
                    <th>Số Lượng </th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((cartProduct) => (
                    <tr key={cartProduct._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <a href={"product/" + cartProduct.product._id}>
                            <img src={cartProduct.product.images[0]} alt="" />
                          </a>
                        </ProductImageBox>
                        {cartProduct.product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() =>
                            lessOfThisProduct(cartProduct.product._id)
                          }
                        >
                          -
                        </Button>
                        <QuantityLabel>{cartProduct.quantity}</QuantityLabel>
                        <Button
                          onClick={() =>
                            moreOfThisProduct(cartProduct.product._id)
                          }
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        {(
                          cartProduct.product.price * cartProduct.quantity
                        ).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Tổng Giá</td>
                    <td></td>
                    <td>
                      {totalPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <h2>Thông tin đơn hàng</h2>
                <Input
                  type="text"
                  placeholder="Họ và Tên"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                <Input
                  type="text"
                  placeholder="Địa chỉ"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                <Input
                  type="text"
                  placeholder="Số điện thoại"
                  name="phonenumber"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                ></Input>
                <Button type="submit" typeblack block>
                  Hoàn Thành Đơn
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginMessage from "@/components/LoginMessage";
import Head from "next/head";
import { useState, useEffect } from "react";
import OrderList from "@/components/OrderList";
import axios from "axios";

export default function Order() {
  const { data: session } = useSession();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`api/order?userid=${session.user.id}`);
      setOrderList(res.data);
    };
    if (session) getOrder();
  }, [session]);

  if (session) {
    return (
      <>
        <Head>
          <title>Đơn hàng</title>
        </Head>
        <Header />
        <Center>
          <Title>Toàn bộ đơn hàng</Title>

          <OrderList orderList={orderList} />
        </Center>
      </>
    );
  }
  return <LoginMessage></LoginMessage>;
}

import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginMessage from "@/components/LoginMessage";
import Head from "next/head";
import { useState } from "react";

export default function ProductsPage({ products }) {
  const { data: session } = useSession();
  if (session)
    return (
      <>
        <Head>
          <title>Toàn Bộ Sản Phẩm</title>
        </Head>
        <Header />
        <Center>
          <Title>Toàn bộ sản phẩm</Title>
          <ProductsGrid products={products} />
        </Center>
      </>
    );
  return <LoginMessage></LoginMessage>;
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

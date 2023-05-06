import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "@/components/Login";
import Head from "next/head";

export default function HomePage({ featuredProduct, newProducts }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div>
        <Login />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <div>
        <Header />
        <Featured product={featuredProduct} />
        <NewProducts products={newProducts} />
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const featuredProductId = "640de2b12aa291ebdf213d48";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

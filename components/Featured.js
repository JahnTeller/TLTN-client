import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product1 }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  const product = {
    _id: "6454b5adcfe58c89c5239300",
    title: "Pin sạc dự phòng Polymer 10.000 mAh AVA+ PJ JP192",
    description:
      "AVA+ PJ JP192 sẽ là nguồn trữ năng lượng tốt cho điện thoại, tablet, t…",
    price: 10,

    images: [
      "https://firebasestorage.googleapis.com/v0/b/next-ecom-d3e30.appspot.com/o/1683273101460.jpg?alt=media&token=d312e9b3-95e2-491a-a279-3b15c5e870dc",
      "https://firebasestorage.googleapis.com/v0/b/next-ecom-d3e30.appspot.com/o/1683273103172.jpg?alt=media&token=2cba29ee-212f-41fc-8198-072041f9fc34",
    ],
    category: "6454b4d7cfe58c89c52392e0",
  };
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.title}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + product?._id}
                  outline={1}
                  white={1}
                >
                  Thông tin
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Thêm vào giỏ hàng
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt="" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

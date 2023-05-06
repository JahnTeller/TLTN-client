import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import { signOut, useSession } from "next-auth/react";
import CartIcon from "./icons/CartIcon";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  &:hover {
    background-color: gray;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SignOutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(244, 67, 54, 0.5);
  }
`;

const NavDropdown = styled.div`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #222;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  ${NavDropdown}:hover & {
    display: block;
  }
`;

const DropdownLink = styled.a`
  color: #aaa;
  display: block;
  background-color: #222;
  padding: 10px;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
  &:hover {
    background-color: #444;
  }
`;
const ItemCount = styled.p`
  text-align: center;
  display: inline;
  color: red;
`;
const UserName = styled.p`
  text-align: center;
  display: inline;
  color: red;
`;
const ImgLogo = styled.img`
  width: 60px;
  height: 60px;
`;
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { data: session } = useSession();
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>BTL Store</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Trang chủ</NavLink>
            <NavLink href={"/products"}>Tất cả sản phẩm</NavLink>
            <NavLink href={"/cart"}>
              {" "}
              Giỏ Hàng <ItemCount>({cartProducts.length})</ItemCount>
            </NavLink>
            <NavDropdown>
              Tài khoản
              <DropdownContent>
                <DropdownLink href={"/orders"}>Đơn đặt hàng</DropdownLink>
                <DropdownLink
                  onClick={() =>
                    signOut({
                      callbackUrl: `${window.location.origin}`,
                    })
                  }
                >
                  Logout <UserName>{session?.user?.name}</UserName>
                </DropdownLink>
              </DropdownContent>
            </NavDropdown>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
export default function LoginMessage() {
  const Mess = styled.div`
    width: full;
    padding: 16px;
    margin: 8px;
    border: 1px solid lighten(#ff3838, 25%);
    border-radius: 8px;
    background-color: rgba(246, 134, 134, 0.55);
    color: red;
    padding: 40px;
    text-align: center;
  `;
  return (
    <>
      <Head>
        <title>Yêu cầu đăng nhập</title>
      </Head>
      <Mess>
        <b>
          BẠN CẦN ĐĂNG NHẬP ĐỂ TIẾP TỤC TRUY CẬP ĐẾN TRANG WEB CỦA CHÚNG TÔI!
        </b>
        <br></br>
        <br></br>
        <Link href="/">VUI LÒNG ẤN VÀO ĐÂY ĐỂ ĐĂNG NHẬP</Link>
      </Mess>
    </>
  );
}

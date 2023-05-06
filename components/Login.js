import { signIn } from "next-auth/react";
import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fa";
import Icon from "./Icon";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const GoogleButton = styled.button`
  padding: 10px 20px;
  margin-top: 15px;
  background-color: #fff;
  color: #737373;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: lightgray;

  &:hover {
    background-color: #f2f2f2;
  }

  img {
    margin-right: 10px;
    height: 20px;
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid gray;
  width: 20rem;
`;

const SignupLink = styled.p`
  margin-top: 20px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const { callbackUrl } = useRouter().query;

  return (
    <>
      <Container>
        <Head>
          <title>Đăng nhập</title>
        </Head>
        <LoginForm onSubmit={formik.handleSubmit}>
          <Title>Đăng nhập</Title>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button type="submit">Login</Button>
          <Line></Line>
          <GoogleButton onClick={() => signIn("google", "")}>
            <img
              src="https://freesvg.org/img/1534129544.png"
              alt="Google Logo"
            />
            Đăng nhập bằng Google
          </GoogleButton>

          <SignupLink>
            Không có tài khoản{" "}
            <a href="/signup">
              <u>tạo tại đây.</u>
            </a>
          </SignupLink>
        </LoginForm>
      </Container>
    </>
  );
};

export default Login;

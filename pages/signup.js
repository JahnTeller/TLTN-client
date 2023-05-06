import { useFormik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your sign-up logic here
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
      name: "",
      phonenumber: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Title>Đăng kí</Title>
        <InputContainer>
          <Label>Họ và tên</Label>
          <Input
            type="text"
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>Số điện thoại</Label>
          <Input
            type="text"
            value={formik.values.phonenumber}
            name="phonenumber"
            onChange={formik.handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <Input
            type="email"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>Mật khẩu</Label>
          <Input
            type="password"
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
          />
          <Label>Nhập lại mật khẩu</Label>
          <Input
            type="password"
            value={formik.values.cpassword}
            name="cpassword"
            onChange={formik.handleChange}
          />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">Sign Up</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  padding: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #0070f3;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;

  &:hover {
    background-color: #0060df;
  }

  &:active {
    background-color: #0050c6;
  }
`;

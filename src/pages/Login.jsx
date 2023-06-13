import styled from "styled-components";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../redux/auth";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1558210834-473f430c09ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color:green;
    cursor:not-allowed;
  }
`;

const RLink = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const NoStyleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e) =>{
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {email, password})
  }

  return (
    <Container>
      <Wrapper>
        <Title>LOGARE</Title>
        <Form>
          <Input onChange = {handleEmailChange} placeholder="email" />
          <Input onChange = {handlePasswordChange} type="password" placeholder="parolă" />
          <Button onClick={handleClick} >CONECTEAZA-TE</Button>
          <NoStyleLink to={"/register"}>
            <RLink>CREAZĂ UN CONT NOU</RLink>
          </NoStyleLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

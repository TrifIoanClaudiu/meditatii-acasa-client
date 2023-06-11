import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { localities } from "../utils";

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

const SelectWrapper = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  appearance: none;
  border: none;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-family: inherit;
`;

const ArrowIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Option = styled.option``;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

const updateUserData = () => {

}

const Profile = () => {
  const [nume, setNume] = useState("nume");
  const [prenume, setPrenume] = useState("prenume");
  const [username, setUsername] = useState(prenume + ' ' + nume)
  const [selectedLocality, setSelectedLocality] = useState("");

  return (
    <Container>
      <Wrapper>
        <Title>{username}</Title>
        <Form>
          <Input placeholder="email" />
          <Input placeholder="nume" />
          <Input placeholder="prenume" />
          <SelectWrapper>
            <Select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
            >
              <Option value="" disabled selected hidden>
                Localitate
              </Option>
              {localities.map((locality, index) => (
                <Option key={index} value={locality}>
                  {locality}
                </Option>
              ))}
            </Select>
            <ArrowIcon>
              <ArrowDropDownIcon />
            </ArrowIcon>
          </SelectWrapper>
          <Button onClick={updateUserData}>Actualizează datele</Button>
          <Link>Schimbă parola</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Profile;

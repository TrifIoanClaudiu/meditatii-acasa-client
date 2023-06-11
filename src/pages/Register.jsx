import styled from "styled-components";
import { mobile } from "../responsive";
import { localities } from "../utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://rare-gallery.com/uploads/posts/563616-Books-Notebooks.jpg")
    no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const SelectWrapper = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  position: relative;
`;

const Select = styled.select`
  width: 98%;
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
  right: 20px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Option = styled.option``;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [selectedLocality, setSelectedLocality] = useState("");

  return (
    <Container>
      <Wrapper>
        <Title>CREAZĂ-ȚI UN CONT</Title>
        <Form>
          <Input placeholder="prenume" />
          <Input placeholder="nume" />
          <Input placeholder="email" />
          <Input placeholder="parolă" />
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
          <Agreement>
            Prin crearea unui cont, sunteți de acord cu prelucrarea datelor personale in comformitate cu <b>POLITICILE DE CONFIDENȚIALITATE</b>
          </Agreement>
          <Button>CREAZĂ</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
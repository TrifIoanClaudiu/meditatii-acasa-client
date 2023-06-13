import styled from "styled-components";
import { mobile } from "../responsive";
import { localities } from "../utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth";
import { isEmail, isPasswordStrong } from "../utils";

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

const InputWrapper = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: ${({ valid }) => (valid ? "1px solid #ccc" : "1px solid red")};
  color: ${({ valid }) => (valid ? "#333" : "red")};
`;

const ErrorMessage = styled.span`
  visibility: hidden;
  background-color: red;
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 4px;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  ${InputWrapper}:hover & {
    visibility: visible;
  }
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
  const [prenume, setPrenume] = useState("");
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailValid(isEmail(value));
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordValid(isPasswordStrong(value));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const formData = {
      password,
      prenume,
      nume,
      email,
      localitate: selectedLocality,
    };
    try {
      await axios.post(`http://localhost:4000/auth/register`, { formData });
      login(dispatch, { email, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREAZĂ-ȚI UN CONT</Title>
        <Form>
          <InputWrapper>
            <Input
              onChange={(event) => setPrenume(event.target.value)}
              placeholder="prenume"
              valid={true}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={(event) => setNume(event.target.value)}
              placeholder="nume"
              valid={true}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={handleEmailChange}
              placeholder="email"
              valid={emailValid}
            />
            {!emailValid && (
              <ErrorMessage>Please enter a valid email address</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={handlePasswordChange}
              placeholder="parolă"
              type="password"
              valid={passwordValid}
            />
            {!passwordValid && (
              <ErrorMessage>
                Password must be at least 8 characters long and contain a
                combination of letters, numbers, and special characters
              </ErrorMessage>
            )}
          </InputWrapper>
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
          <Button onClick={handleClick}>CREAZĂ</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

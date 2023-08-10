import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { localities } from "../utils";
import Toolbar from "../components/Toolbar";
import axios from "axios";
import { update } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import DeleteModal from "../components/DeleteModal";
import PasswordModal from "../components/PasswordModal";

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

const ModalWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: opacity 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const SuccessModal = ({ message }) => {
  return (
    <ModalWrapper show>
      <ModalContent>
        <p>{message}</p>
      </ModalContent>
    </ModalWrapper>
  );
};

const Profile = ({ user }) => {
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [prenume, setPrenume] = useState("");
  const [selectedLocality, setSelectedLocality] = useState(user.localitate);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");

  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handlePasswordChange = async (oldPassword, newPassword) => {
    try {
      console.log(`http://localhost:4000/users/password/${user._id}`);
      await axios.put(
        `http://localhost:4000/users/password/${user._id}`,
        { oldPassword, newPassword },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );
      setShowSuccessModal(true);
      setPasswordChangeMessage("Parola a fost schimbată cu succes")
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      setShowSuccessModal(true);
      setPasswordChangeMessage("Parola veche este incorectă")
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 1500);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deleteAccount = () => {
    // Implement your delete account logic here
  };

  const updateUserData = async (event) => {
    event.preventDefault();
    const payload = { nume, prenume, email, localitate: selectedLocality };
    try {
      const res = await axios.put(
        `http://localhost:4000/users/update/${user._id}`,
        payload,
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );
      res.data.accessToken = user.accessToken;
      dispatch(update(res.data));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Toolbar />
      <Container>
        <Wrapper>
          <Title>
            {user.prenume} {user.nume}
          </Title>
          <Form>
            <Input
              placeholder="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="nume"
              onChange={(event) => setNume(event.target.value)}
            />
            <Input
              placeholder="prenume"
              onChange={(event) => setPrenume(event.target.value)}
            />
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
            <Link onClick={openPasswordModal}>Schimbă parola</Link>
            <Link onClick={openDeleteModal}>Șterge contul</Link>
          </Form>
          {showPasswordModal && (
            <PasswordModal
              closeModal={closePasswordModal}
              handlePasswordChange={handlePasswordChange}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              closeModal={closeDeleteModal}
              deleteAccount={deleteAccount}
            />
          )}
        </Wrapper>
        {showSuccessModal && (
          <SuccessModal message={passwordChangeMessage} />
        )}
      </Container>
    </>
  );
};

export default Profile;

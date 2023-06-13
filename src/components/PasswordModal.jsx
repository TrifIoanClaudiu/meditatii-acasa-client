import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  margin: 0 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover::after {
      content: "Parola nouă nu poate fi aceiași cu cea veche";
      position: fixed;
      top: calc(100% + 10px);
      left: calc(50% - 100px);
      background-color: #007bff;
      color: #fff;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
      white-space: nowrap;
    }
  }
`;

const PasswordModal = ({ closeModal, handlePasswordChange }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleConfirmClick = () => {
    handlePasswordChange(oldPassword, newPassword);
    closeModal();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Schimbă parola</Title>
        <Input
          type="password"
          placeholder="Parola veche"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Parola nouă"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <ButtonWrapper>
          <Button onClick={handleConfirmClick} disabled={!oldPassword || !newPassword}>
            Confirmă
          </Button>
          <Button onClick={closeModal}>Renunță</Button>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PasswordModal

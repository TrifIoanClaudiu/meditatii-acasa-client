import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #333333;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555555;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const DeleteModal = ({ closeModal, deleteAccount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteAccount();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>Ștergere cont</Title>
        <Message>Ești sigur că dorești să ștergi acest cont?</Message>
        <ButtonWrapper>
          <Button onClick={handleDelete}>Da</Button>
          <Button onClick={closeModal}>Nu</Button>
        </ButtonWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteModal;

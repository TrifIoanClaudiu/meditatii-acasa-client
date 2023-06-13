import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Toolbar from "../components/Toolbar";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f6ca87;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  background-color: #f9e0bb;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  flex: 1;
  padding: 40px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  border-radius: 8px;
  object-fit: cover;
`;

const DetailsWrapper = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Property = styled.div`
  margin-bottom: 20px;
`;

const PropertyLabel = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const PropertyValue = styled.span`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: ${props => (props.isLoading ? "#0056b3" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.isLoading ? "not-allowed" : "pointer")};
  margin-top: 20px;
  transition: background-color 0.3s ease;
  pointer-events: ${props => (props.isLoading ? "none" : "auto")};

  &:hover {
    background-color: ${props => (props.isLoading ? "#0056b3" : "#0056b3")};
  }
`;


const ModalWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? "visible" : "hidden")};
  transition: opacity 0.3s ease;
`;

const slideIn = keyframes`
  from {
    margin-top: -100px;
  }
  to {
    margin-top: 20px;
  }
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease;
  margin-top: -100px;
  margin-top: ${props => (props.show ? "20px" : "-100px")};
`;

const Teacher = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.currentUser);
  const [emailResult, setEmailResult] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await axios.request({
          method: "GET",
          url: `http://localhost:4000/teachers/${id}`,
        });
        setTeacher(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTeacher();
  }, [id]);

  const handleClick = async (event) => {
    event.preventDefault();
    const userId = user._id;
    const profesorId = teacher._id;
    const payload = { userId, profesorId };
    try {
      await axios.post(`http://localhost:4000/mailer/`, payload);
      setEmailResult(true);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } catch (err) {
      setEmailResult(false);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    }
  };

  return (
    <>
      <Toolbar />
      {!isLoading && (
        <Wrapper>
          <Container>
            <ImageWrapper>
              <Image src={teacher.img} alt={teacher.nume} />
            </ImageWrapper>
            <DetailsWrapper>
              <Title>{teacher.nume}</Title>
              <Property>
                <PropertyLabel>Materie: </PropertyLabel>
                <PropertyValue>{teacher.materie}</PropertyValue>
              </Property>
              <Property>
                <PropertyLabel>Pret: </PropertyLabel>
                <PropertyValue>{teacher.pret}</PropertyValue>
              </Property>
              <Property>
                <PropertyLabel>Localitate: </PropertyLabel>
                <PropertyValue>{teacher.localitate}</PropertyValue>
              </Property>
              <Property>
                <PropertyLabel>Zile Disponibile:</PropertyLabel>
                <PropertyValue>{teacher.zileDisponibile.join(", ")}</PropertyValue>
              </Property>
              <Button isLoading={isLoading} onClick={handleClick} disabled={isLoading}>
                {isLoading ? "Loading..." : "Rezervă o ședință"}
              </Button>
            </DetailsWrapper>
          </Container>
        </Wrapper>
      )}
      <ModalWrapper show={showModal}>
        <ModalContent show={showModal}>
          {emailResult ? "Email trimis cu succes" : "A aparut o eroare in trimiterea mail-ului"}
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default Teacher;

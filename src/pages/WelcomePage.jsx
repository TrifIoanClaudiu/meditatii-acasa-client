import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Toolbar from "../components/Toolbar";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://wallpapercave.com/dwp2x/wp6517777.jpg")
      center;
  background-size: cover;
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Description = styled.p`
  font-size: 24px;
  text-align: center;
  color: #555;
  margin-bottom: 60px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const FeatureIcon = styled.span`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #777;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffca28;
  }
`;


const InformativeText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin-top: 40px;
`;

const WelcomePage = () => {
  return (
    <>
    <Toolbar />
    <MainContainer>
      <Title>Meditații la domiciliu</Title>
      <Description>
        Dacă îți dorești să-ți dezvolți abilitățile și să-ți explorezi
        potențialul neîntrecut, ai ajuns în locul potrivit!
        <br /> La site-ul nostru de meditații, te invităm să descoperi metode
        eficiente și practici speciale care îți vor amplifica capacitatea de
        învățare
      </Description>
      <Link to={"/teachers"}>
      <Button>Cunoaște profesorii noștri</Button>
      </Link>
      <FeatureContainer>
        <FeatureCard>
          <FeatureIcon>📚</FeatureIcon>
          <FeatureTitle>Mărește-ți performanța</FeatureTitle>
          <FeatureDescription>
            Cu ajutorul profesorilor noștri vei deveni un elev mai bun într-un
            timp foarte scurt.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>👨‍🏫</FeatureIcon>
          <FeatureTitle>Profesori de top</FeatureTitle>
          <FeatureDescription>
            Avem privilegiul de a beneficia de profesori excepționali, cu
            abilități remarcabile în predare și pasiune pentru dezvoltarea
            noastră.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>🌟</FeatureIcon>
          <FeatureTitle>Gândește creativ</FeatureTitle>
          <FeatureDescription>
            Descoperă cu noi modalități diverse și distractive de învățare, pe
            care le putem prezenta special pentru tine.
          </FeatureDescription>
        </FeatureCard>
      </FeatureContainer>
      <InformativeText>
        Dacă ești profesor și dorești să te alături echipei noastre, trimite-ne
        CV-ul tău la: arnoldnagy25@gmail.com
      </InformativeText>
    </MainContainer>
    </>
  );
};

export default WelcomePage;

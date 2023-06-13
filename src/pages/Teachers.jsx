import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TeacherCard from "../components/TeacherCard";
import { Link } from "react-router-dom";
import Toolbar from "../components/Toolbar";

const TeachersContainer = styled.div`
  margin-top: 50px;
  background-color: var(--main-color);
  overflow: hidden;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-between; /* Adjust alignment */
  align-items: center; /* Adjust alignment */
  margin-bottom: 10px;
  background-color: #f2f2f2; /* Set the background color */
`;

const Dropdown = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const TabItem = styled.button`
  background-color: ${(props) => (props.active ? "#606C5D" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "inherit")};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--main-color)" : "rgba(255, 255, 255, 0.2)"};
    color: ${(props) => (props.active ? "#fff" : "#fff")};
  }
`;

const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const NoStyleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localitate, setLocalitate] = useState("Sibiu");
  const [materie, setMaterie] = useState("");
  const materii = ["Toate", "Română", "Matematică", "Informatică"];
  const localitati = ["Cluj", "Sibiu"];

  useEffect(() => {
    const payload = { localitate };
    async function fetchTeachers() {
      try {
        if (materie) payload.materie = materie;
        const response = await axios.request({
          method: "GET",
          url: "http://localhost:4000/teachers/",
          params: payload,
        });
        setTeachers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTeachers();
  }, [localitate, materie]);

  const handleMaterieChange = (selectedMaterie) => {
    selectedMaterie === "Toate" ? setMaterie("") : setMaterie(selectedMaterie);
  };

  const handleLocalitateChange = (e) => {
    setLocalitate(e.target.value);
  };

  return (
    <>
      <Toolbar />
      <TeachersContainer>
        <TabBar>
          <div>
            {materii.map((materie) => (
              <TabItem
                key={materie}
                onClick={() => handleMaterieChange(materie)}
                active={materie === materie}
              >
                {materie}
              </TabItem>
            ))}
          </div>
          <div>
            <Dropdown value={localitate} onChange={handleLocalitateChange}>
              {localitati.map((localitate) => (
                <option value={localitate} key={localitate}>
                  {localitate}
                </option>
              ))}
            </Dropdown>
          </div>
        </TabBar>
        {!isLoading && (
          <TeachersGrid>
            {teachers.map((item) => (
              <NoStyleLink to={`/teacher/${item._id}`} key={item._id}>
                <TeacherCard item={item} />
              </NoStyleLink>
            ))}
          </TeachersGrid>
        )}
      </TeachersContainer>
    </>
  );
};

export default Teachers;

import styled from "styled-components";

const TeacherCardContainer = styled.div`
  cursor: pointer;
  background-color: transparent;
  width: 30vw;
  height: 100%;
  padding-left: 5px;

  @media (max-width: 900px) {
    width: 40vw;
  }

  @media (max-width: 600px) {
    margin-right: 30px;
    width: 90vw;
  }
`;

const TeacherImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
`;

const TeacherTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px;
  h1 {
    border-bottom: 1px #fff solid;
    font-size: 25px;
    color: black;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-family: 'Oswald', sans-serif;
    background-color: var(--main-color);
    text-align: center;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TeacherCard = ({ item }) => {
    return (
      <TeacherCardContainer>
        <TeacherImage src={item.img} alt="" />
        <TeacherTitleContainer>
          <h1>
            {item.nume} - {item.materie}
          </h1>
        </TeacherTitleContainer>
      </TeacherCardContainer>
    );
  };

  export default TeacherCard;
import styled from "styled-components";
import { Header } from "../Header";
import { Link } from "react-router-dom";

export const Clothes = () => {
  return (
    <ClothesContainer>
      <Header />
      <Main>
        <TopBar>
          <Title>Our clothes</Title>
          <AddButton to="button">+ Add Clothes</AddButton>
        </TopBar>

        
      </Main>
    </ClothesContainer>
  );
};

const ClothesContainer = styled.div`
  background: #ebf2fa;
`;
const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  box-sizing: border-box;
`;

const TopBar = styled.section`
  max-width: 1100px;
  margin: 0px auto;
  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
`;
const AddButton = styled(Link)`
  padding: 8px 16px;

  color: #ffffff;
  background-color: #2563eb;

  font-size: 14px;
  font-weight: 600;

  text-decoration: none;

  border-radius: 8px;

  &:hover {
    background-color: #1d4ed8;
  }
`;

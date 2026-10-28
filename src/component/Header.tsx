import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoLink to="/">
          <LogoText>StyleHub</LogoText>
        </LogoLink>

        <Navigation>
          <HomeLink to="/">Home</HomeLink>

          <LoginLink to="/login">Log in</LoginLink>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;

  background-color: #ffffff;

  border-bottom: 1px solid #e2e8f0;
`;

const HeaderContent = styled.div`
  max-width: 1100px;

  margin: 0 auto;
  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;

  gap: 10px;

  text-decoration: none;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;

  color: #0f172a;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;

  gap: 12px;
`;

const HomeLink = styled(Link)`
  padding: 8px 16px;

  color: #2563eb;
  background-color: #eff6ff;

  font-size: 14px;
  font-weight: 600;

  text-decoration: none;

  border-radius: 8px;

  &:hover {
    background-color: #dbeafe;
  }
`;

const LoginLink = styled(Link)`
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

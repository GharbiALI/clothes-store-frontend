import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";
import hero from "../assets/hero.png";

export const Home = () => {
  return (
    <PageContainer>
      <Header />
      <Hero>
        <HeroContainer>
          <HeroContent>
            <SubTitle>New Collection 2026</SubTitle>

            <Title>
              Wear every style,
              <Highlight>your</Highlight> way.
            </Title>

            <Description>
              StyleHub helps you browse, search and manage your clothes
              collection by size, color and brand, all in one place.
            </Description>

            <Actions>
              <PrimaryButton>
                Your clothes <Arrow>→</Arrow>
              </PrimaryButton>

              <SecondaryButton>Log in</SecondaryButton>
            </Actions>
          </HeroContent>
          <HeroImage>
            <Image src={hero} alt="Books preview" title="books image" />
          </HeroImage>
        </HeroContainer>
      </Hero>
      <Footer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;

  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Hero = styled.section`
  flex: 1;

  padding: 80px 24px;

  background-color: #ebf2fa;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
`;

const HeroContent = styled.div`
  flex: 1;

  max-width: 600px;
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
`;

const SubTitle = styled.span`
  display: inline-block;

  padding: 6px 14px;
  margin-bottom: 20px;

  background-color: #dbeafe;
  color: #1d4ed8;

  font-size: 13px;
  font-weight: 600;

  border-radius: 999px;
`;

const Title = styled.h1`
  margin: 0 0 16px 0;

  font-size: 40px;
  font-weight: 700;

  color: #0f172a;
`;

const Highlight = styled.span`
  color: #2563eb;
`;

const Description = styled.p`
  width: 520px;

  margin: 0 0 28px 0;

  font-size: 15px;

  color: #64748b;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

const PrimaryButton = styled.a`
  display: flex;
  align-items: center;

  padding: 11px 22px;

  background-color: #2563eb;
  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  text-decoration: none;

  border-radius: 8px;

  gap: 8px;

  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const Arrow = styled.span`
  font-size: 15px;
`;

const SecondaryButton = styled.button`
  padding: 11px 22px;

  background-color: #ffffff;
  color: #1e293b;

  font-size: 14px;
  font-weight: 600;

  text-decoration: none;

  border: 1px solid #cbd5e1;
  border-radius: 8px;

  cursor: pointer;
  &:hover {
    border-color: #94a3b8;
    background-color: #f8fafc;
  }
`;

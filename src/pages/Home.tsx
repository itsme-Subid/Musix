import { styled } from "styled-components";
import Banner from "../components/Banner";
import Cards from "../components/Cards";

const StyledHome = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 10rem;
`;

const Home = () => {
  return (
    <StyledHome>
      <Banner />
      <Cards />
    </StyledHome>
  );
};

export default Home;

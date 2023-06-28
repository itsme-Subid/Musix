import { styled } from "styled-components";
import girl from "../assets/girl.png";
import { FaSun, FaMoon } from "react-icons/fa";

const StyledBanner = styled.div`
  width: 100%;
  height: fit-content;
  background-color: rgb(var(--secondary-color));
  & .wrapper {
    display: flex;
    justify-content: space-between;
    width: min(90%, 70rem);
    max-height: 15rem;
    & img {
      object-fit: contain;
      transform: rotateY(180deg);
    }
    & .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      gap: 0.5rem;
      color: rgb(var(--light-color));
      & h2 {
        font-size: 2.5rem;
        font-weight: 700;
      }
      & p {
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.5;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        & .sun {
          color: rgb(var(--sun-color));
        }
        & .night {
          color: rgb(var(--dark-color));
        }
      }
    }
  }
`;

const Banner = () => {
  return (
    <StyledBanner>
      <div className="wrapper">
        <img src={girl} alt="" />
        <div className="content">
          <h2>Your favourite tunes</h2>
          <p>
            All <FaSun className="sun" /> and all <FaMoon className="night" />
          </p>
        </div>
      </div>
    </StyledBanner>
  );
};

export default Banner;

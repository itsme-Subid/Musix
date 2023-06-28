import { styled } from "styled-components";

const StyledSidebar = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: min(90%, 15rem);
  background-color: rgb(var(--primary-color));
  & ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 80%;
    margin: auto;
    list-style: none;
    gap: 1.5rem;
    & li {
      color: rgb(var(--light-color) / 75%);
      transition: 0.15s;
      &:hover {
        color: rgb(var(--light-color));
      }
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/search">Search</a>
        </li>
        <li>
          <a href="/favourites">Favourites</a>
        </li>
        <li>
          <a href="/playlists">Playlists</a>
        </li>
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;

import { styled } from "styled-components";
import sample from "../assets/sample.json";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setMusic } from "../redux/slices/music-slice";
import { musicType } from "../types/music";

const StyledCards = styled.div`
  padding-block: 0.75rem;
  & h2 {
    margin-bottom: 0.5rem;
  }
  & .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 2.5rem 1.5rem;
    & .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      & p {
        font-size: 1rem;
        font-weight: 500;
        color: rgb(var(--dark-color) / 75%);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        /* text-align: center; */
        max-width: 100%;
        max-height: 1.5rem;
        line-height: 1.5rem;
      }
      & img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 0.5rem;
      }
    }
  }
`;

const Cards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (index: number) => {
    const url = sample?.tracks[index]?.hub?.actions[1]?.uri;
    const title = sample?.tracks[index]?.title;
    const artist = sample?.tracks[index]?.subtitle;
    const img = sample?.tracks[index]?.images.coverart;
    dispatch(
      setMusic({
        url,
        title,
        artist,
        img,
      } as musicType)
    );
  };
  return (
    <StyledCards className="container">
      <h2>Featured Playlists</h2>
      <div className="cards">
        {sample?.tracks?.map((item, index) => {
          return (
            <div
              className="card"
              key={index}
              onClick={() => handleClick(index)}
            >
              <img src={item.images.coverart} alt="" />
              <p>{item?.title}</p>
            </div>
          );
        })}
      </div>
    </StyledCards>
  );
};

export default Cards;

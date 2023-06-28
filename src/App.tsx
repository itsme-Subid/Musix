import { Suspense, lazy } from "react";
import { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import axios from "axios";
import sample from "./assets/sample.json";
import Sidebar from "./components/Sidebar";
import { musicType } from "./types/music";
import { useAppSelector } from "./redux/store";
import MusicPlayer from "./components/MusicPlayer";

const Home = lazy(() => import("./pages/Home"));

const GlobalStyle = createGlobalStyle`
  :root{
    --light-color: 255 255 255;
    --dark-color: 14 14 14;
    --primary-color: 87 79 216;
    --secondary-color: 255 181 168;
    --tertiary-color: 25 195 125;
    --success-color: 3 179 10;
    --sun-color: 255 213 10;
    --font-poppins: 'Poppins', system-ui, sans-serif;
    scroll-behavior: smooth;
    color-scheme: light;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
  html, body {
    overflow-x: hidden;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-poppins);
    outline: none;
  }
  body {
    background-color: rgb(var(--light-color));
    color: rgb(var(--dark-color));
    min-height: 100vh;
    display: grid;
    place-items: center;
  }
  .container {
    margin-inline: auto;
    width: min(90%, 70rem);
  }
  a {
    text-decoration: none;
    color: inherit;
    transition: 0.15s;
  }
  input{
    background-color: transparent;
  }
  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    user-select: none;
  }
  & span.loader {
    margin-bottom: 2rem;
    width: 1rem;
    height: 1rem;
    border: 2px solid #FFF;
    border-bottom-color: rgb(var(--dark-color));
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
  }
  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
  #root {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex
  }
  .page-container {
    position: relative;
    width: 100%;
  }
`;

const App = () => {
  const location = useLocation();
  // const getRecommendations = async () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://shazam.p.rapidapi.com/songs/list-recommendations",
  //     params: {
  //       key: "484129036",
  //       locale: "en-US",
  //     },
  //     headers: {
  //       "X-RapidAPI-Key": "b3c2c0f5cfmsh2c589162cf211a7p1e0246jsn8f6434e8a637",
  //       "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    // getRecommendations();
    console.log(sample);
  }, []);
  const music: musicType = useAppSelector((state) => state.musicReducer.music);
  return (
    <>
      <GlobalStyle />
      <Sidebar />
      <div className="page-container">
        <Suspense
          fallback={
            <div
              className="loader-container"
              style={{
                height: "100vh",
                width: "100vw",
                display: "grid",
                placeItems: "center",
              }}
            >
              <span className="loader"></span>
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        {!!music && <MusicPlayer />}
      </div>
    </>
  );
};

export default App;

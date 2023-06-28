import { Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import sample from "./assets/sample.json";
import Sidebar from "./components/Sidebar";
import { musicType } from "./types/music";
import { useAppSelector } from "./redux/store";
import MusicPlayer from "./components/MusicPlayer";
import "./global.css";

const Home = lazy(() => import("./pages/Home"));

const App = () => {
  const location = useLocation();
  const getRecommendations = async () => {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/songs/list-recommendations",
      params: {
        key: "484129036",
        locale: "en-US",
      },
      headers: {
        "X-RapidAPI-Key": "b3c2c0f5cfmsh2c589162cf211a7p1e0246jsn8f6434e8a637",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRecommendations();
    console.log(sample);
  }, []);
  const music: musicType = useAppSelector((state) => state.musicReducer.music);
  return (
    <>
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

import { useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import { useAppSelector } from "../redux/store";
import { musicType } from "../types/music";
import audio from "../assets/audio.mp3";
import { FaPlay, FaPause } from "react-icons/fa";

const StyledMusicPlayer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 10rem;
  width: 100%;
  background-color: rgb(var(--secondary-color));
  overflow: hidden;
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 90%;
    margin-inline: auto;
    & .audio-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      & .progress {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 0.5rem;
        background-color: rgb(var(--light-color));
        border-radius: 0.25rem;
        cursor: pointer;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.5rem;
          height: 1.5rem;
          background-color: rgb(var(--primary-color));
          border: 0.25rem solid rgb(var(--light-color));
          box-shadow: 0 0 0.5rem rgb(var(--dark-color) / 25%);
          border-radius: 50%;
        }
      }
    }
    & .details {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      & .img-box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5rem;
        aspect-ratio: 1;
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1rem;
          aspect-ratio: 1;
          background-color: rgb(var(--light-color));
          border-radius: 50%;
        }
        &.rotate {
          animation: rotate 5s linear infinite;
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
        & img {
          width: 100%;
          height: 100%;
          position: relative;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      & .controls {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        user-select: none;
        & span {
          background-color: rgb(var(--primary-color));
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          color: rgb(var(--light-color));
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          & svg {
            width: 1.25rem;
            height: 1.25rem;
          }
        }
      }
      & .time {
        margin-left: auto;
      }
    }
  }
`;

const MusicPlayer = () => {
  const music: musicType = useAppSelector((state) => state.musicReducer.music);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const [isPlaying, SetIsPlaying] = useState(false);
  const [time, setTime] = useState({
    duration: 0,
    currentTime: 0,
  });
  useEffect(() => {
    if (!audioRef.current || !progressRef.current) {
      return;
    }
    const audio = audioRef.current;
    const progress = progressRef.current;
    audio.addEventListener("loadedmetadata", () => {
      progress.max = audio.duration.toString();
      progress.value = audio.currentTime.toString();
      setTime({
        duration: audio.duration,
        currentTime: audio.currentTime,
      });
    });
    progress.addEventListener("change", () => {
      audio.currentTime = progress.valueAsNumber;
      audio.play();
      SetIsPlaying(true);
      setTime((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    });
    if (isPlaying) {
      const updateTime = setInterval(() => {
        progress.value = audio.currentTime.toString();
        setTime((prev) => ({
          ...prev,
          currentTime: audio.currentTime,
        }));
      }, 1000);
      return () => {
        clearInterval(updateTime);
      };
    }
  }, [isPlaying]);

  return (
    <StyledMusicPlayer>
      <div className="wrapper">
        <div className="audio-container">
          <audio className="audio" ref={audioRef}>
            {/* <source src={music?.url} type="audio/mp3" /> */}
            <source src={audio} type="audio/mp3" />
          </audio>
          <input type="range" className="progress" ref={progressRef} />
        </div>
        <div className="details">
          <div className={`img-box ${isPlaying && "rotate"}`}>
            <img src={music?.img} alt="" />
          </div>
          <div className="content">
            <p>{music?.title}</p>
            <p>{music?.artist}</p>
          </div>
          <div className="controls">
            <span
              onClick={() => {
                if (audioRef.current?.paused) {
                  audioRef.current?.play();
                  SetIsPlaying(true);
                } else {
                  audioRef.current?.pause();
                  SetIsPlaying(false);
                }
              }}
            >
              {!isPlaying ? <FaPlay /> : <FaPause />}
            </span>
          </div>
          <div className="time">
            {/* <p>0:00/3:00</p> */}
            {/* time in the above format */}
            <p>
              {Math.floor(time.currentTime / 60)}:
              {Math.floor(time.currentTime % 60) < 10
                ? `0${Math.floor(time.currentTime % 60)}`
                : Math.floor(time.currentTime % 60)}
              /{Math.floor(time.duration / 60)}:
              {Math.floor(time.duration % 60) < 10
                ? `0${Math.floor(time.duration % 60)}`
                : Math.floor(time.duration % 60)}
            </p>
          </div>
        </div>
      </div>
    </StyledMusicPlayer>
  );
};

export default MusicPlayer;

import React from "react";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import { Track } from "@spotify/web-api-ts-sdk";
import './player.css'

interface PlayerProps {
  track: Track | null;
  handleNext: () => void;
  handlePrev: () => void;
  handleEnded: () => void;
}

export const PlayerComponent: React.FC<PlayerProps> = ({ track, handleNext, handlePrev, handleEnded }) => {
  if (!track) {
    return <div>Please select a track</div>;
  }

  return (
    <AudioPlayer
      autoPlay
      src={track.preview_url || ""}
      onPlay={() => console.log("preview is playing...")}
      onEnded={handleEnded}
      onClickPrevious={handlePrev}
      onClickNext={handleNext}
      showSkipControls
      showJumpControls = {false}
      customAdditionalControls={[
        <div className="trackInfo" key={track.id}>
          <img
            className="playerImage"
            src={track.album.images[0]?.url}
            alt="Album cover"
          />
          <div className="textInfo">
            <div className="trackName">
              {track.name}
            </div>
            <div className="artistName">
              {track.artists.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        </div>,
      ]}
    />
  );
};

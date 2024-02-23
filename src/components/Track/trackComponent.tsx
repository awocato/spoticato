// @ts-nocheck
import  { useState } from "react";
import { Track } from "@spotify/web-api-ts-sdk";
import { useTimeFormat } from "../../hooks/useTimeFormat";
import './trackComponent.css'

interface TrackComponentProps {
  track: Track;
  index: number;
  handlePlayClick: (index: number) => void;
}

export function TrackComponent({ track, index, handlePlayClick }: TrackComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const trackDuration = useTimeFormat(track.duration_ms);

  const handlePlayButtonClick = () => {
    setSelectedTrack(track);
    handlePlayClick(index);
  };

  return (
    <div className="trackCard" key={track.id}>
      <div className="trackOne">
        <img className="trackImage" src={track.album.images[0]?.url} alt="cover" />
      <div className="trackTextFull">
          <h2 className="trackName">{track.name}</h2>
          <p className="trackArtist">{track.artists.map((artist) => artist.name).join(", ")}</p>
          <p className="trackDuration">{trackDuration}</p>
      </div>
      </div>
      <button className='trackPlayButton'type="button" onClick={handlePlayButtonClick}>Play</button>
      
    </div>
  );
}

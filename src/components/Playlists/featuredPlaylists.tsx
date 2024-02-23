import { useContext, useEffect, useState } from "react";
import { SpotifyContext } from "../../api/auth";
import { FeaturedPlaylists, Track } from "@spotify/web-api-ts-sdk";
import { PlayerComponent } from "../Player/player";
import { FaPlay } from "react-icons/fa";
import "./playlists.css";

export function Playlists() {
  const spotifyApi = useContext(SpotifyContext);
  const [playlists, setPlaylists] = useState<FeaturedPlaylists[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!spotifyApi) return;

    spotifyApi.browse
      .getFeaturedPlaylists()
      .then((response) => {
        const playlistPromises = response.playlists.items.map((playlist) =>
          spotifyApi.playlists.getPlaylist(playlist.id)
        );

        Promise.all(playlistPromises)
          .then((playlistDataArray) => {
            const playlistsWithTracks = response.playlists.items.map(
              (playlist, index) => ({
                ...playlist,
                tracks: playlistDataArray[index].tracks.items,
              })
            );
            setPlaylists(playlistsWithTracks);
            setLoading(false); 
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [spotifyApi]);

  if (!spotifyApi) {
    return (
      <div>Spotify SDK is not available. Please check your configuration.</div>
    );
  }

  const handlePlayClick = (playlist: FeaturedPlaylists) => {
    if (playlist.tracks && playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0].track);
    }
  };

  const handleNext = () => {
    const currentPlaylist = playlists.find((playlist) =>
      playlist.tracks.some(
        (track: { track: Track | null }) => track.track === currentTrack
      )
    );
    if (currentPlaylist) {
      const currentTrackIndex = currentPlaylist.tracks.findIndex(
        (track) => track.track === currentTrack
      );
      if (
        currentTrackIndex !== -1 &&
        currentTrackIndex < currentPlaylist.tracks.length - 1
      ) {
        setCurrentTrack(currentPlaylist.tracks[currentTrackIndex + 1].track);
      } else {
        const nextPlaylistIndex =
          playlists.findIndex((playlist) => playlist === currentPlaylist) + 1;
        if (nextPlaylistIndex < playlists.length) {
          setCurrentTrack(playlists[nextPlaylistIndex].tracks[0].track);
        }
      }
    }
  };

  const handlePrev = () => {
    const currentPlaylist = playlists.find((playlist) =>
      playlist.tracks.some((track) => track.track === currentTrack)
    );
    if (currentPlaylist) {
      const currentTrackIndex = currentPlaylist.tracks.findIndex(
        (track) => track.track === currentTrack
      );
      if (currentTrackIndex > 0) {
        setCurrentTrack(currentPlaylist.tracks[currentTrackIndex - 1].track);
      }
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="playlists-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="sidebar">
            {playlists.map((playlist) => (
              <div key={playlist.id}>
                <p
                  className="playlistTextItem"
                  onClick={() => handlePlayClick(playlist)}
                  onKeyUp={() => handlePlayClick(playlist)}
                >
                  {playlist.name}
                </p>
              </div>
            ))}
          </div>

          <div className="playlist-grid">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-item">
                <div className="imageDiv">
                  <img
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    className="playlist-image"
                  />
                  <FaPlay
                  type="button"
                  onClick={() => handlePlayClick(playlist)}
                  className="play-button"
                />
                </div>
                <h3 className="playlist-name">{playlist.name}</h3>
                
              </div>
            ))}

            {currentTrack && (
              <PlayerComponent
                track={currentTrack}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleEnded={handleEnded}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

import  { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "../../api/auth";
import { useDebounce } from "../../hooks/useDebounce";
import { Track, SearchResults } from "@spotify/web-api-ts-sdk";
import { TrackComponent } from "../Track/trackComponent";
import { PlayerComponent } from "../Player/player";
import './search.css'

export function SearchComponent() {
  const sdk = useContext(SpotifyContext);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState<SearchResults<"track"> | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (debouncedSearchTerm) {
          const results = await sdk.search(debouncedSearchTerm, ["track" as const]);
          setSearchResults(results.tracks);
        } else {
          setSearchResults(null);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        
      }
    };

    fetchSearchResults();
  }, [sdk, debouncedSearchTerm]);

  const handlePlayClick = (index: number) => {
    if (currentTrackIndex !== null) {
      // idk what to do 
    }
    setCurrentTrackIndex(index);
  };

  const handleNext = () => {
    if (searchResults && currentTrackIndex !== null && currentTrackIndex < searchResults.items.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };
  const handleEnded = () => {
    if (currentTrackIndex !== null && searchResults) {
      if (currentTrackIndex < searchResults.items.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setCurrentTrackIndex(null);
      }
    }
  };
  
  return (
    <div className='searchContainer'>
      <input className="input"
        placeholder="Search for a track"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults?.items.length > 0 ? (
        searchResults.items.map((track: Track, index: number) => (
          <TrackComponent className='trackComp' key={track.id} track={track} index={index} handlePlayClick={handlePlayClick} />
        ))
      ) : (
        <p>No results found</p>
      )}
      {currentTrackIndex !== null && searchResults && (
        <PlayerComponent track={searchResults.items[currentTrackIndex]}  handleNext={handleNext} handlePrev={handlePrev} handleEnded={handleEnded} />
      )}
    </div>
  );
}

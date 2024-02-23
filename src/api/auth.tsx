import React, { createContext } from "react";
import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useSpotify } from "../hooks/useSpotify";

export const SpotifyContext = createContext<SpotifyApi | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    Scopes.all
  );

  const contextValue = sdk || null;

  if (!contextValue) {
    return <div>Spotify SDK is not available. Please check your configuration.</div>;
  }

  return <SpotifyContext.Provider value={contextValue}>{children}</SpotifyContext.Provider>;
}

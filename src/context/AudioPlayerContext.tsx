import React from "react";

interface IAudioPlayerContext {
  currentlyPlayingId: string | null;
  setCurrentlyPlayingId: (id: string | null) => void;
}

const noop = () => {
  return;
};

export const AudioPlayerContext = React.createContext<IAudioPlayerContext>({
  currentlyPlayingId: null,
  setCurrentlyPlayingId: noop,
});

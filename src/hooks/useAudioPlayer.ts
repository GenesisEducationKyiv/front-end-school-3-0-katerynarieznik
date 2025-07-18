import React from "react";
import { AudioPlayerContext } from "@/context/AudioPlayerContext";

export function useAudioPlayer() {
  const context = React.use(AudioPlayerContext);

  if (context === undefined) {
    console.error("useAudioPlayer must be used within an AudioPlayerProvider");
  }

  return context;
}

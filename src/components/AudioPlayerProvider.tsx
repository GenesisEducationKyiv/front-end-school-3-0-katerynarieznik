import React from "react";
import { AudioPlayerContext } from "@/context/AudioPlayerContext";

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentlyPlayingId, setCurrentlyPlayingId] = React.useState<
    string | null
  >(null);

  const value = React.useMemo(
    () => ({
      currentlyPlayingId,
      setCurrentlyPlayingId,
    }),
    [currentlyPlayingId, setCurrentlyPlayingId],
  );

  return <AudioPlayerContext value={value}>{children}</AudioPlayerContext>;
}

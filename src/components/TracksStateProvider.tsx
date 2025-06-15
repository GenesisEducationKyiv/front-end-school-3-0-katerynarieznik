import React from "react";
import type { ITracksListState } from "@/types";
import { DEFAULT_TRACKS_LIST_STATE } from "@/lib/constants";
import { TracksStateContext } from "@/context/TracksStateContext";

export function TracksStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tracksListState, setTracksListState] =
    React.useState<ITracksListState>(DEFAULT_TRACKS_LIST_STATE);

  const value = React.useMemo(
    () => ({
      tracksListState,
      defaultTracksListState: DEFAULT_TRACKS_LIST_STATE,
      setTracksListState,
    }),
    [tracksListState],
  );

  return <TracksStateContext value={value}>{children}</TracksStateContext>;
}

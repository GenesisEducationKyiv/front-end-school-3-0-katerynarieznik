import React from "react";
import type { ITracksListState } from "@/types";
import { DEFAULT_TRACKS_LIST_STATE } from "@/lib/constants";

interface ITracksStateContext {
  tracksListState: ITracksListState;
  defaultTracksListState: ITracksListState;
  setTracksListState: React.Dispatch<React.SetStateAction<ITracksListState>>;
}

const noop = () => {
  return;
};

export const TracksStateContext = React.createContext<ITracksStateContext>({
  tracksListState: DEFAULT_TRACKS_LIST_STATE,
  defaultTracksListState: DEFAULT_TRACKS_LIST_STATE,
  setTracksListState: noop,
});

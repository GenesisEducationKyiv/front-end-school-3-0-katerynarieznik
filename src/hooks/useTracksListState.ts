import React from "react";
import { TracksStateContext } from "@/context/TracksStateContext";

export function useTracksListState() {
  const context = React.use(TracksStateContext);

  if (context === undefined) {
    console.error(
      "useTracksListState must be used within an TracksStateProvider",
    );
  }

  return context;
}

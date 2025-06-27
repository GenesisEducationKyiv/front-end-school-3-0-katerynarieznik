import { useTracksStateStore } from "@/stores/tracksState.store";
import type { ITracksState } from "@/types";

export const useTracksStateParams = (): ITracksState => {
  const page = useTracksStateStore((state) => state.page);
  const search = useTracksStateStore((state) => state.search);
  const genre = useTracksStateStore((state) => state.genre);
  const artist = useTracksStateStore((state) => state.artist);
  const sortOrder = useTracksStateStore((state) => state.sortOrder);

  return {
    page,
    search,
    genre,
    artist,
    sortOrder,
  };
};

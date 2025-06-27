import { create } from "zustand";
import type { ITracksState } from "@/types";

interface ITracksStore extends ITracksState {
  updatePage: (page: number) => void;
  updateSearch: (search: string) => void;
  updateGenre: (genre: string) => void;
  updateArtist: (artist: string) => void;
  updateSortOrder: (sortOrder: string) => void;
}

export const useTracksStateStore = create<ITracksStore>((set) => ({
  page: 1,
  search: "",
  genre: "",
  artist: "",
  sortOrder: "createdAt-desc",

  updatePage: (page) => set(() => ({ page })),
  updateSearch: (search) => set(() => ({ search })),
  updateGenre: (genre) => set(() => ({ genre })),
  updateArtist: (artist) => set(() => ({ artist })),
  updateSortOrder: (sortOrder) => set(() => ({ sortOrder })),
}));

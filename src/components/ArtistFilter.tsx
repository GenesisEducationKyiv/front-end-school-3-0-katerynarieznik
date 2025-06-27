import { useTracksStateStore } from "@/stores/tracksState.store";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ArtistFilter() {
  const artist = useTracksStateStore((state) => state.artist);
  const updateArtist = useTracksStateStore((state) => state.updateArtist);
  const updatePage = useTracksStateStore((state) => state.updatePage);

  return (
    <div className="w-full min-w-50 lg:max-w-50">
      <Label htmlFor="artistFilter" className="sr-only">
        Filter by artist
      </Label>
      <div className="relative">
        <Input
          id="artistFilter"
          placeholder="Filter by artist"
          data-testid="filter-artist"
          value={artist}
          onChange={(e) => {
            updateArtist(e.target.value);
            updatePage(1);
          }}
          className="bg-background focus-visible:ring-sidebar-ring h-9 w-full shadow-none focus-visible:ring-2"
        />
      </div>
    </div>
  );
}

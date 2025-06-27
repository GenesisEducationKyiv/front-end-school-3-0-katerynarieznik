import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useGetGenres } from "@/queries";
import { getGenresDropdownOptions } from "@/lib/mappers";
import { useTracksStateStore } from "@/stores/tracksState.store";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";

export function GenreFilter() {
  const [open, setOpen] = React.useState(false);
  const genre = useTracksStateStore((state) => state.genre);
  const updateGenre = useTracksStateStore((state) => state.updateGenre);
  const updatePage = useTracksStateStore((state) => state.updatePage);

  const { data: genres, isLoading } = useGetGenres();
  const genresList = getGenresDropdownOptions(genres);

  const renderGenreSelectTitle = () => {
    if (isLoading) {
      return <Loader>Loading genres...</Loader>;
    }

    if (genre) {
      return genresList.find((item) => item.value === genre)?.label;
    }

    return (
      <span className="text-muted-foreground font-normal">Filter by genre</span>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-testid="filter-genre"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-50 justify-between lg:max-w-50"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          {renderGenreSelectTitle()}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="Search genre..." />
          <CommandList>
            <CommandEmpty>No genre found.</CommandEmpty>
            <CommandGroup>
              {genresList.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const newGenre = currentValue === genre ? "" : currentValue;

                    updateGenre(newGenre);
                    updatePage(1);

                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      genre === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

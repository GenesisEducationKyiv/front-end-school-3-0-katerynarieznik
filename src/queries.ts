import {
  useQuery,
  type UseQueryResult,
  keepPreviousData,
} from "@tanstack/react-query";

import type { ITrack, ITracksListState } from "@/types";

import { getGenresApi, getTrackBySlugApi, getTracksApi } from "@/lib/api";
import { unwrapResult } from "@/lib/unwrapResult";
import { createGetTracksQueryParams } from "@/lib/createGetTracksQueryParams";

export interface GetTracksQueryResult {
  data: ITrack[];
  meta: { limit: number; page: number; total: number; totalPages: number };
}

export const useGetTracks = (
  params: ITracksListState,
): UseQueryResult<GetTracksQueryResult> => {
  return useQuery({
    queryKey: ["tracks", params],
    queryFn: async () => {
      const queryParams = createGetTracksQueryParams(params);

      const result = await getTracksApi(queryParams);
      return unwrapResult(result);
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetGenres = (): UseQueryResult<string[]> =>
  useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const result = await getGenresApi();
      return unwrapResult(result);
    },
  });

export const useGetTrackBySlug = ({
  slug,
}: {
  slug: string;
}): UseQueryResult<ITrack> =>
  useQuery({
    queryKey: ["track", slug],
    queryFn: async () => {
      const result = await getTrackBySlugApi(slug);
      return unwrapResult(result);
    },
    enabled: !!slug,
  });

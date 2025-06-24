import { err, ok, Result } from "neverthrow";
import { API_BASE_URL } from "@/lib/constants";
import type { ITrack } from "@/types";
import type { GetTracksQueryResult } from "@/queries";

export async function getTracksApi(
  params: URLSearchParams,
): Promise<Result<GetTracksQueryResult, Error>> {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks?${params}`);
    const data = await response.json();

    if (!response.ok) {
      return err(
        new Error(`Failed to fetch tracks. ${data?.error} ${data?.message}`),
      );
    }

    return ok(data);
  } catch (e) {
    return err(e instanceof Error ? e : new Error("Unknown error"));
  }
}

export async function getTrackBySlugApi(
  slug: string,
): Promise<Result<ITrack, Error>> {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${slug}`);
    const data = await response.json();

    if (!response.ok) {
      return err(
        new Error(
          `Failed to fetch track by slug. ${data?.error}  ${data?.message}`,
        ),
      );
    }

    return ok(data);
  } catch (e) {
    return err(e instanceof Error ? e : new Error("Unknown error"));
  }
}

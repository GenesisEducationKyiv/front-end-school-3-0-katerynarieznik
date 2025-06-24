import { Result, ok, err } from "neverthrow";
import { API_BASE_URL } from "@/lib/constants";
import type { ITrack, TTrackForm } from "@/types";

export async function editTrackApi(
  id: string,
  formData: TTrackForm,
): Promise<Result<ITrack, Error>> {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return err(new Error(data?.error ?? "Track update failed"));
    }

    return ok(data as ITrack);
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Unknown error"));
  }
}

import { Result, ok, err } from "neverthrow";
import { API_BASE_URL } from "@/lib/constants";
import type { ITrack } from "@/types";

export async function uploadAudioFileApi(
  id: string,
  formData: FormData,
): Promise<Result<ITrack, Error>> {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return err(new Error(data?.error || "Upload failed"));
    }

    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Unknown error"));
  }
}

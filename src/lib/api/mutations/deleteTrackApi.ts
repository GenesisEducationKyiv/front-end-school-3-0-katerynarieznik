import { Result, ok, err } from "neverthrow";
import { API_BASE_URL } from "@/lib/constants";

export async function deleteTrackApi(
  id: string,
): Promise<Result<string, Error>> {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();
      return err(new Error(data?.error ?? "Failed to delete track"));
    }

    return ok("Track deleted successfully");
  } catch (error) {
    return err(error instanceof Error ? error : new Error("Unknown error"));
  }
}

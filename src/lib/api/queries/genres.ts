import { err, ok, Result } from "neverthrow";
import { API_BASE_URL } from "@/lib/constants";

export async function getGenresApi(): Promise<Result<string[], Error>> {
  try {
    const response = await fetch(`${API_BASE_URL}/genres`);
    const data = await response.json();

    if (!response.ok) {
      return err(
        new Error(`Failed to fetch genres. ${data?.error}  ${data?.message}`),
      );
    }

    return ok(data);
  } catch (e) {
    return err(e instanceof Error ? e : new Error("Unknown error"));
  }
}

import { Result } from "neverthrow";

/**
 * Unwraps a neverthrow Result, returning the value if successful or throwing the error if not.
 *
 * This utility is needed for proper functioning of the Tanstack Query that expect errors to be thrown as exceptions
 *
 * @param result - The Result object to unwrap.
 * @returns The value inside the Result if it is ok.
 * @throws The error inside the Result if it is an error.
 */
export function unwrapResult<T, E extends Error>(result: Result<T, E>): T {
  if (result.isErr()) {
    throw result.error;
  }
  return result.value;
}

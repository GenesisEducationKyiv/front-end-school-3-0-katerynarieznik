import { describe, expect, it } from "vitest";

import type { ITracksListState } from "@/types";

import { createGetTracksQueryParams } from "./createGetTracksQueryParams";

const emptyQueryParams = {};

const filledQueryParams: ITracksListState = {
  page: 3,
  search: "search query",
  genre: "pop",
  artist: "artist",
  sortOrder: "createdAt-desc",
};

describe("createGetTracksQueryParams", () => {
  it("should not create empty query params and only set default limit and page  values", () => {
    const queryParams = createGetTracksQueryParams(
      emptyQueryParams as ITracksListState,
    );

    expect(queryParams.get("limit")).toBe("12");
    expect(queryParams.get("page")).toBe("1");
    expect(queryParams.get("search")).toBeNull();
    expect(queryParams.get("genre")).toBeNull();
    expect(queryParams.get("artist")).toBeNull();
    expect(queryParams.get("sort")).toBeNull();
    expect(queryParams.get("order")).toBeNull();
  });

  it("should create query params with provided values", () => {
    const queryParams = createGetTracksQueryParams(filledQueryParams);

    expect(queryParams.get("limit")).toBe("12");
    expect(queryParams.get("page")).toBe("3");
    expect(queryParams.get("search")).toBe("search query");
    expect(queryParams.get("genre")).toBe("pop");
    expect(queryParams.get("artist")).toBe("artist");
    expect(queryParams.get("sort")).toBe("createdAt");
    expect(queryParams.get("order")).toBe("desc");
  });
});

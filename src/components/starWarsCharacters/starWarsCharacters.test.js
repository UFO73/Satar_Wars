import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import StarWarsCharacters from "./starWarsCharacters";

// Mock the API function
jest.mock("../api/api", () => ({
  fetchCharacters: jest.fn(() => Promise.resolve([{
    name: "Luke Skywalker",
    films: [1,2,3],
    starships: [1,2,3],
  }])),
  fetchStarshipInfo: jest.fn(() => Promise.resolve({
    films: [1,2],
    name: 'Starship 1',
  })),
}));

describe("StarWarsCharacters component", () => {
  test("renders character names correctly", async () => {
    const { getByText } = render(<StarWarsCharacters />);

    // Wait for the characters to be loaded
    await waitFor(() => {
      expect(getByText("Luke Skywalker")).toBeInTheDocument();
    });
  });

  test("loads more characters when scrolled to the end", async () => {
    const { getByText } = render(<StarWarsCharacters />);

    // Wait for the initial characters to be loaded
    await waitFor(() => {
      expect(getByText("Luke Skywalker")).toBeInTheDocument();
    });

    // Simulate scrolling to the end
    window.scrollTo(0, document.body.scrollHeight);

    // Wait for more characters to be loaded
    await waitFor(() => {
      expect(getByText("Luke Skywalker", { exact: false })).toBeInTheDocument();
    });
  });

  test("opens modal when a character is clicked", async () => {
    const { getByText, getByTestId } = render(<StarWarsCharacters />);

    // Wait for the characters to be loaded
    await waitFor(() => {
      expect(getByText("Luke Skywalker")).toBeInTheDocument();
    });

    // Click on a character
    act(() => {
      getByText("Luke Skywalker").click();
    });

    // Wait for the modal to be opened
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });
  });
});

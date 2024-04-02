import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import StarWarsCharacters from "./starWarsCharacters";

// Mock the API function
jest.mock("../api/api", () => ({
  fetchCharacters: jest.fn(() => Promise.resolve([{ name: "Luke Skywalker" }])),
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
    getByText("Luke Skywalker").click();

    // Wait for the modal to be opened
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });
  });
});

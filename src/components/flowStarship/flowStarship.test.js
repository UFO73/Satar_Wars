import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FlowStarship from "./flowStarship";
import { fetchStarshipInfo } from "../api/api";

// Mock the API function
jest.mock("../api/api", () => ({
  fetchStarshipInfo: jest.fn(),
}));

describe("FlowStarship component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock function calls after each test
  });

  test("renders correctly with character data", async () => {
    const character = {
      name: "Luke Skywalker",
      films: [1, 2, 3],
      starships: [1, 2, 3],
    };
    // Mock the response data for fetchStarshipInfo function
    fetchStarshipInfo.mockResolvedValueOnce({ films: [1, 2], name: "Starship A" })
      .mockResolvedValueOnce({ films: [1, 3], name: "Starship B" })
      .mockResolvedValueOnce({ films: [3], name: "Starship C" });

    const { getByText } = render(<FlowStarship character={character} />);

    // Wait for all fetchStarshipInfo calls to resolve
    await waitFor(() => {
      expect(fetchStarshipInfo).toHaveBeenCalledTimes(3); // Ensure fetchStarshipInfo function is called 3 times
    });

    // Ensure rendered elements with starship names are present
    expect(getByText("Starship A")).toBeInTheDocument();
    expect(getByText("Starship B")).toBeInTheDocument();
    expect(getByText("Starship C")).toBeInTheDocument();
  });

  test("renders correctly without character data", async () => {
    const character = {
      name: "Luke Skywalker",
      films: [],
      starships: [],
    };
    const { container } = render(<FlowStarship character={character} />);

    // Ensure no starship nodes are rendered when character data is empty
    expect(container.querySelector(".react-flow__node")).toBeNull();
  });
});

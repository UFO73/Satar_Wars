import axios from "axios";
import { fetchCharacters, fetchStarshipInfo } from "./api"; // Assuming your functions are in a file named apiFunctions.js

// Mocking axios
jest.mock("axios");

describe("fetchCharacters function", () => {
    it("fetches characters data from the API", async () => {
        const mockData = {
            data: {
                results: ["character1", "character2", "character3"],
            },
        };
        axios.get.mockResolvedValue(mockData);

        const characters = await fetchCharacters(1);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith("https://sw-api.starnavi.io/people/?page=1");
        expect(characters).toEqual(["character1", "character2", "character3"]);
    });

    it("throws an error when fetching characters fails", async () => {
        const errorMessage = "Failed to fetch characters";
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchCharacters(1)).rejects.toThrow(errorMessage);
    });
});

describe("fetchStarshipInfo function", () => {
    it("fetches starship information from the API", async () => {
        const starshipId = 1;
        const mockData = {
            data: {
                name: "Starship Name",
                model: "Starship Model",
                // Add other properties as needed
            },
        };
        axios.get.mockResolvedValue(mockData);

        const starshipInfo = await fetchStarshipInfo(starshipId);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`https://sw-api.starnavi.io/starships/${starshipId}/`);
        expect(starshipInfo).toEqual(mockData.data);
    });

    it("throws an error when fetching starship info fails", async () => {
        const starshipId = 1;
        const errorMessage = "Failed to fetch starship info";
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchStarshipInfo(starshipId)).rejects.toThrow(errorMessage);
    });
});

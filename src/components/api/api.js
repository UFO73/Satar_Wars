import axios from "axios";

// Create axios instance with base URL
const instance = axios.create({
    baseURL: "https://sw-api.starnavi.io/",
});

// Function to fetch characters data from the API
export const fetchCharacters = async (page) => {
    try {
        const response = await instance.get(`people/?page=${page}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
};

// Function to fetch starship information from the API
export const fetchStarshipInfo = async (starshipId) => {
    try {
        const response = await instance.get(`starships/${starshipId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching starship info:", error);
        throw error;
    }
};


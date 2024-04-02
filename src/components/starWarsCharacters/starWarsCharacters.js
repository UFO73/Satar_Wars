import React, { useState, useEffect, useRef } from "react";
import FlowStarship from "../flowStarship/flowStarship";
import { fetchCharacters } from "../api/api";

const StarWarsCharacters = () => {
    // State hooks for characters data, loading status, current page, modal visibility, and selected character
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    // Function to fetch characters data from the API
    const fetchData = async () => {
        // Fetch data only if no characters are loaded or loading is not in progress
        if (characters.length === 0 || !loading) {
            setLoading(true); // Set loading state to true
            try {
                const data = await fetchCharacters(page); // Fetch characters data for the current page
                if (data.length > 0) {
                    // Append fetched data to the existing characters array
                    setCharacters([...characters, ...data]);
                    setPage(prevPage => prevPage + 1); // Increment page number for the next fetch
                }
                setLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                setLoading(false); // Set loading state to false if an error occurs during fetching
            }
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Intersection observer for lazy loading more characters when scrolling
    const observer = useRef();
    const lastCharacterRef = useRef();

    useEffect(() => {
        // Create intersection observer to detect when the last character element is intersected
        if (loading) return; // Don't observe if loading is in progress
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchData(); // Fetch more data when the last character element is intersected
            }
        });
        // Observe the last character element
        if (lastCharacterRef.current) {
            observer.current.observe(lastCharacterRef.current);
        }
        // Cleanup observer when component unmounts or when loading state changes
        return () => {
            if (lastCharacterRef.current) {
                observer.current.unobserve(lastCharacterRef.current);
            }
        };
    }, [loading]);

    // Event handler for clicking on a character element
    const handleCharacterClick = character => {
        setShowModal(true); // Show the modal
        setSelectedCharacter(character); // Set the selected character
    };

    // Render the list of characters and the modal if showModal is true
    return (
        <div>
            <div>
                <ul>
                    {characters.map((character, index) => {
                        // Check if the current character is the last one in the list
                        if (characters.length === index + 1) {
                            // If it's the last character, attach a ref to it for lazy loading
                            return (
                                <li key={index} className="hero" ref={lastCharacterRef}>
                                    <div onClick={() => handleCharacterClick(character)}>
                                        {character.name}
                                    </div>
                                </li>
                            );
                        } else {
                            // If it's not the last character, render normally
                            return (
                                <li key={index} className="hero" onClick={() => handleCharacterClick(character)}>
                                    {character.name}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            {/* Render the modal if showModal is true */}
            {showModal && <FlowStarship character={selectedCharacter} />}
        </div>
    );
};

export default StarWarsCharacters;


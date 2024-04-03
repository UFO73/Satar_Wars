import React, { useState, useEffect, useMemo } from "react";
import ReactFlow from "react-flow-renderer";
import { fetchStarshipInfo } from "../api/api"; 

    // Object mapping film IDs to film names
const FilmsObj = {
    Film1: "A New Hope",
    Film2: "The Empire Strikes Back",
    Film3: "Return of the Jedi",
    Film4: "The Phantom Menace",
    Film5: "Attack of the Clones",
    Film6: "Revenge of the Sith"
};

const FlowStarship = ({ character }) => {
    const [starshipsInfo, setStarshipsInfo] = useState({});

    useEffect(() => {
        // Function to fetch starship information
        const fetchStarshipsInfo = async (starships) => {
            try {
                const starshipsInfoArray = await Promise.all(
                    starships.map(async (starshipId) => {
                        // Using fetchStarshipInfo function instead of direct Axios call
                        const response = await fetchStarshipInfo(starshipId);
                        return response;
                    })
                );

                const info = {};
                starshipsInfoArray.forEach(shipInfo => {
                    if (!shipInfo) return;

                    shipInfo.films.forEach(filmId => {
                        if (!info[filmId]) {
                            info[filmId] = [];
                        }
                        info[filmId].push(shipInfo.name);
                    });
                });
                setStarshipsInfo(info);
            } catch (error) {
                console.error("Error fetching starships info:", error);
            }
        };

        fetchStarshipsInfo(character.starships);
    }, [character.starships]);

    // Mapping film nodes
    const filmsNodes = useMemo(() => {
        return character.films.map((film, index) => ({
            id: `film-${film}`,
            data: { label: FilmsObj[`Film${film}`] },
            position: { x: 10 + index * 160, y: 100 },
            type: starshipsInfo[film] ? "default" : "output",
        }));
    }, [character.films, starshipsInfo]);

    // Mapping end nodes
    const endNodes = useMemo(() => {
        return character.films.reduce((acc, film) => {
            const shipNames = starshipsInfo[film];
            if (shipNames && shipNames.length > 0) {
                shipNames.forEach((shipName, index) => {
                    acc.push({
                        id: `end-${film}-${index}`,
                        data: { label: shipName },
                        position: { x: film * 160, y: 200 + index * 80 },
                        type: "output",
                    });
                });
            }
            return acc;
        }, []);
    }, [character.films, starshipsInfo]);


    // Combining all nodes
    const nodes = useMemo(() => {
        return [
            {
                id: "1",
                type: "input",
                data: { label: character.name },
                position: { x: 10, y: 10 },
            },
            ...filmsNodes,
            ...endNodes,
        ];
    }, [character.name, filmsNodes, endNodes]);

    // Mapping edges between nodes
    const edges = useMemo(() => {
        return character.films.flatMap((film) => [
            {
                id: `edge-${film}`,
                source: "1",
                target: `film-${film}`,
                animated: true,
            },
            ...starshipsInfo[film]?.map((_, index) => ({
                id: `edge-${film}-end-${index}`,
                source: `film-${film}`,
                target: `end-${film}-${index}`,
                animated: true,
            })) || [],
        ]);
    }, [character.films, starshipsInfo]);

    return (
        <div className="flow-container" data-testid="modal">
            {/* Rendering the ReactFlow component */}
            <ReactFlow className="test" nodes={nodes} edges={edges} />
        </div>
    );
};

export default FlowStarship;



"use client";


import React, { useState, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';
import axios from 'axios';
import './Modal.css';

const Modal = ({ character }) => {
    const [starshipsInfo, setStarshipsInfo] = useState({});
 // закинути в Api
    useEffect(() => {
        const fetchStarshipsInfo = async (starships) => {
            try {
                const starshipsInfoArray = await Promise.all(
                    starships.map(async (starshipId) => {
                        const response = await axios.get(`https://sw-api.starnavi.io/starships/${starshipId}/`);
                        return response.data;
                    })
                );

                const info = {};
                starshipsInfoArray.forEach(shipInfo => {
                    shipInfo.films.forEach(filmId => {
                        if (!info[filmId]) {
                            info[filmId] = [];
                        }
                        info[filmId].push(shipInfo.name);
                    });
                });
                setStarshipsInfo(info);
            } catch (error) {
                console.error('Error fetching starships info:', error);
            }
        };

        fetchStarshipsInfo(character.starships);
    }, [character.starships]);

    const FilmsObj = {
        Film1: "A New Hope",
        Film2: "The Empire Strikes Back",
        Film3: "Return of the Jedi",
        Film4: "The Phantom Menace",
        Film5: "Attack of the Clones",
        Film6: "Revenge of the Sith"
    }

    const filmsNodes = character.films.map((film, index) => ({
        id: `film-${film}`,
        data: { label: FilmsObj[`Film${film}`] },
        position: { x: 10 + index * 160, y: 100 },
        type: starshipsInfo[film] ? 'default' : 'output',
    }));

    const endNodes = character.films.reduce((acc, film) => {
        const shipNames = starshipsInfo[film];
        if (shipNames && shipNames.length > 0) {
            shipNames.forEach((shipName, index) => {
                acc.push({
                    id: `end-${film}-${index}`,
                    data: { label: shipName },
                    position: { x: film * 160, y: 200 + index * 80 },
                    type: 'output',
                });
            });
        }
        return acc;
    }, []);

    const nodes = [
        {
            id: '1',
            type: 'input',
            data: { label: character.name },
            position: { x: 10, y: 10 },
        },
        ...filmsNodes,
        ...endNodes,
    ];

    const edges = character.films.flatMap((film) => ([
        {
            id: `edge-${film}`,
            source: '1',
            target: `film-${film}`,
            animated: true,
        },
        ...starshipsInfo[film]?.map((_, index) => ({
            id: `edge-${film}-end-${index}`,
            source: `film-${film}`,
            target: `end-${film}-${index}`,
            animated: true,
        })) || [],
    ]));

    return (
        <div className='flow-container'>
            <ReactFlow
                className='test'
                nodes={nodes}
                edges={edges}
            />
        </div>
    );
};

export default Modal;
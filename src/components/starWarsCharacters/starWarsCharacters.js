import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import Modal from '../modal/Modal';

const StarWarsCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
   
//  винести Api
    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://sw-api.starnavi.io/people/?page=${page}`);
            console.log("наш", response.data)
            setCharacters([...characters, ...response.data.results]);
            setPage(prevPage => prevPage + 1);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching characters:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    const observer = useRef();
    const lastCharacterRef = useRef();

    useEffect(() => {
        if (loading) return;

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchCharacters();
            }
        });

        if (lastCharacterRef.current) {
            observer.current.observe(lastCharacterRef.current);
        }

        return () => {
            if (lastCharacterRef.current) {
                observer.current.unobserve(lastCharacterRef.current);
            }
        };
    }, [loading]);

    const handleCharacterClick = (character) => {
        setShowModal(true)
        setSelectedCharacter(character);
    };

    return (
        <div>
            <div>
                <ul>
                    {characters.map((character, index) => {
                        if (characters.length === index + 1) {
                            return (
                                <li key={index} className="hero" ref={lastCharacterRef}>
                                    <div onClick={() => handleCharacterClick(character)}>
                                        {character.name}
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <li key={index} className="hero" onClick={() => handleCharacterClick(character)}>
                                    {character.name}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            {/* {showModal && <Modal character={selectedCharacter} />} */}
        </div>
    );
};

export default StarWarsCharacters;
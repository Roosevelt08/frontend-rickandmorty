import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import Modal from '../components/Modal';

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch('http://localhost:3001/api/characters');
      const data = await response.json();
      setCharacters(data.slice(0, 9));
    };

    const fetchFavorites = async () => {
      const response = await fetch('http://localhost:3001/api/favorites');
      const data = await response.json();
      setFavorites(data);
    };

    fetchCharacters();
    fetchFavorites();
  }, []);

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const addToFavorites = async (character: Character) => {
    try {
      const response = await fetch('http://localhost:3001/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      });
      if (response.ok) {
        alert('Personaje agregado a favoritos');
        closeModal();
        const updatedFavorites = await fetch('http://localhost:3001/api/favorites');
        const favoritesData = await updatedFavorites.json();
        setFavorites(favoritesData);
      }
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
    }
  };

  const deleteFavorite = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/favorites/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
        setFavorites(updatedFavorites);
      } else {
        alert('Error al eliminar el favorito');
      }
    } catch (error) {
      console.error('Error al eliminar el favorito:', error);
    }
  };
  

  return (
    <div>
      <div className="grid-container">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onOpenModal={openModal}
          />
        ))}
      </div>


      {isModalOpen && selectedCharacter && (
        <Modal
          character={selectedCharacter}
          onClose={closeModal}
          onAddToFavorites={addToFavorites}
        />
      )}

      <div className="favorites-container">
        <h2>Favoritos</h2>
        {favorites.length > 0 ? (
          <div className="grid-container">
            {favorites.slice(0, 3).map((favorite) => (
              <CharacterCard
                key={favorite.id}
                character={favorite}
                onOpenModal={() => { }}
              />
            ))}
          </div>
        ) : (
          <p>No tienes personajes favoritos aún.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

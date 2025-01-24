import React from 'react';

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

interface CharacterCardProps {
  character: Character;
  onOpenModal: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onOpenModal }) => {
  return (
    <div className="character-card" onClick={() => onOpenModal(character)}>
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="hover-overlay">
        <h3>{character.name}</h3>
        <h3>{character.species}</h3>
      </div>
    </div>
  );
};

export default CharacterCard;

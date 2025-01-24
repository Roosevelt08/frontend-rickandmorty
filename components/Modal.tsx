import React from 'react';

interface ModalProps {
  character: {
    id: number;
    name: string;
    species: string;
    image: string;
  } | null;
  onClose: () => void;
  onAddToFavorites: (character: {
    id: number;
    name: string;
    species: string;
    image: string;
  }) => void;
}

const Modal: React.FC<ModalProps> = ({ character, onClose, onAddToFavorites }) => {
  if (!character) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h2>{character.name}</h2>
        <p>Especie: {character.species}</p>
        <img src={character.image} alt={character.name} style={{ width: '100%' }} />
        <button
          className="add-to-favorites"
          onClick={() => onAddToFavorites(character)}
        >
          Agregar a Favoritos
        </button>
      </div>
    </div>
  );
};

export default Modal;

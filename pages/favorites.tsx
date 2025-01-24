import React from 'react';

interface FavoriteProps {
  favorites: {
    id: number;
    name: string;
    species: string;
    image: string;
  }[];
  onDeleteFavorite: (id: number) => void;
}

const Favorites: React.FC<FavoriteProps> = ({ favorites, onDeleteFavorite }) => {
  return (
    <div className="favorites-container">
      <h2>Favoritos</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <div className="favorite-card" key={favorite.id}>
              <button
                className="delete-favorite"
                onClick={() => onDeleteFavorite(favorite.id)}
              >
                ✖
              </button>
              <img src={favorite.image} alt={favorite.name} />
              <div className="character-info">
                <h3>{favorite.name}</h3>
                <p>{favorite.species}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes personajes favoritos aún.</p>
      )}
    </div>
  );
};

export default Favorites;

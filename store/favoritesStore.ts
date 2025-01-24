import { create } from 'zustand';


interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

interface FavoritesState {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (character: Character) =>
    set((state) => ({
      favorites: [...state.favorites, character],
    })),
  removeFavorite: (id: number) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
    })),
}));

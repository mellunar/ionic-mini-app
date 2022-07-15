import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';

type SortBy = 'name' | 'total_rating' | 'aggregated_rating' | 'rating' | 'hypes' | 'first_release_date' | 'none';

export interface SearchPreferences {
  sortOrder: 'asc' | 'desc' | 'none';
  sortBy: SortBy;
  showUnrated: boolean;
  rating: { lower: number; upper: number };
  ratingBy: 'none' | 'total_rating' | 'aggregated_rating' | 'rating';
  ratingDisplay: 'total_rating' | 'aggregated_rating' | 'rating';
  parameter: 'name' | 'keywords';
  platforms: number[];
  ignore: {
    themes: number[];
    genres: number[];
    status: number[];
  };
  themes: number[];
  genres: number[];
  game_modes: number[];
  player_perspectives: number[];
  status: number[]; // status
}

const initialState: SearchPreferences = {
  sortOrder: 'none',
  sortBy: 'none',
  showUnrated: true,
  rating: { lower: 0, upper: 100 },
  ratingBy: null,
  ratingDisplay: 'aggregated_rating',
  parameter: 'name',
  platforms: null,
  ignore: {
    themes: null,
    genres: null,
    status: null,
  },
  themes: null,
  genres: null,
  game_modes: null,
  player_perspectives: null,
  status: null,
};

const searchStore = createStore({ name: 'search-preferences' }, withProps<SearchPreferences>(initialState));

export const persist = persistState(searchStore, {
  key: 'search-preferences',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class SearchStore {
  getSearchPreferences() {
    return searchStore.getValue();
  }

  getSearchRatingPreference() {
    return searchStore.getValue().ratingDisplay;
  }

  resetSearchPreferences() {
    this.setSearchPreferences(initialState);
  }

  setSearchPreferences(preferences: SearchPreferences) {
    searchStore.update(() => preferences);
  }
}

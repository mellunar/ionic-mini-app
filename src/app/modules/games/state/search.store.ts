import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';

export interface SearchPreferences {
  sortOrder: 'asc' | 'desc' | 'none';
  sortBy: 'name' | 'total_rating' | 'hypes' | 'none';
  rating: number[];
  parameter: string;
  platforms: number[];
  ignore: {
    themes: number[];
    genres: number[];
  };
  themes: number[];
  genres: number[];
  modes: number[];
  perspectives: number[];
}

const searchStore = createStore(
  { name: 'search-preferences' },
  withProps<SearchPreferences>({
    sortOrder: 'none',
    sortBy: 'none',
    rating: [0, 100],
    parameter: 'name',
    platforms: null,
    ignore: {
      themes: null,
      genres: null,
    },
    themes: null,
    genres: null,
    modes: null,
    perspectives: null,
  })
);

export const persist = persistState(searchStore, {
  key: 'search-preferences',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class SearchStore {
  getSearchPreferences() {
    return searchStore.getValue();
  }

  setSearchPreferences(preferences: SearchPreferences) {
    searchStore.update(() => preferences);
  }
}

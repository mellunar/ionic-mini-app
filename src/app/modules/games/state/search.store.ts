import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';

interface SearchPreferences {
  sortOrder: 'asc' | 'desc';
  sortBy: string; // wich parameter - name, rating, release date, hypes
  rating: number[];
  parameter: string;
  platform: number;
  ignore: {
    categories: string[];
  };
}

const searchStore = createStore(
  { name: 'search-preferences' },
  withProps<SearchPreferences>({
    sortOrder: null,
    sortBy: null,
    rating: [0, 100],
    parameter: 'name',
    platform: null,
    ignore: null,
  })
);

@Injectable({ providedIn: 'root' })
export class SearchStore {
  getSearchPreferences() {
    return searchStore.getValue();
  }

  setSearchPreferences(preferences: SearchPreferences) {
    searchStore.update((state) => ({
      ...state,
      preferences,
    }));
  }
}

import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import {
  deleteAllEntities,
  deleteEntities,
  getAllEntities,
  selectAllEntities,
  selectFirst,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { map, tap } from 'rxjs/operators';
import { FilterOptions } from 'src/app/core/services/ui/ui.interface';

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
  };
  themes: number[];
  genres: number[];
  game_modes: number[];
  player_perspectives: number[];
  status: number | number[]; // status
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
  },
  themes: null,
  genres: null,
  game_modes: null,
  player_perspectives: null,
  status: null,
};

const searchStore = createStore(
  { name: 'search-preferences' },
  withEntities<FilterOptions>(),
  withProps<SearchPreferences>(initialState)
);

export const persist = persistState(searchStore, {
  key: 'search-preferences',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class SearchStore {
  history$ = searchStore.pipe(
    selectAllEntities(),
    map((entities) => entities.reverse())
  );

  addToHistory(term: string) {
    const hasEntity = this.getHistory().some((item) => item.name === term);

    if (hasEntity) {
      return;
    }

    const count = this.getHistoryLength();

    if (count >= 5) {
      let first;
      searchStore
        .pipe(
          selectFirst(),
          tap((item) => (first = item))
        )
        .subscribe();
      this.removeFromHistory(first.id);
    }

    const item: FilterOptions = {
      id: Math.floor(Date.now() / 1000), // convert to unix timestamp
      name: term,
    };

    searchStore.update(upsertEntities(item));
  }

  cleanHistory() {
    searchStore.update(deleteAllEntities());
  }

  getHistory() {
    return searchStore.query(getAllEntities());
  }

  getHistoryLength() {
    return searchStore.query(getAllEntities()).length;
  }

  removeFromHistory(id) {
    searchStore.update(deleteEntities(id));
  }

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
    searchStore.update((state) => ({ ...state, ...preferences }));
  }
}

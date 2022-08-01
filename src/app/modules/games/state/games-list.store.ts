import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import {
  upsertEntities,
  entitiesPropsFactory,
  getAllEntities,
  getEntitiesCount,
  deleteAllEntities,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { of } from 'rxjs';
import { Game } from './games.interface';

export type GamesListStoreRefs = 'recent' | 'future' | 'hyped';

interface ListsUpdated {
  recent?: number;
  future?: number;
  hyped?: number;
}

const { recentEntitiesRef, withRecentEntities } = entitiesPropsFactory('recent');
const { futureEntitiesRef, withFutureEntities } = entitiesPropsFactory('future');
const { hypedEntitiesRef, withHypedEntities } = entitiesPropsFactory('hyped');

const store = createStore(
  { name: 'games-list' },
  withProps<ListsUpdated>(null),
  withRecentEntities<Game>(),
  withFutureEntities<Game>(),
  withHypedEntities<Game>()
);

export const persist = persistState(store, {
  key: 'games-list',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class GamesListStore {
  addGamesByRef(games: Game[], ref: GamesListStoreRefs) {
    store.update(upsertEntities(games, { ref: this.getRef(ref) }));
  }

  getGamesCountByRef(ref: GamesListStoreRefs) {
    return store.query(getEntitiesCount({ ref: this.getRef(ref) }));
  }

  getGamesByRef(ref: GamesListStoreRefs, offset: number) {
    // paginated query
    const page = store.query(getAllEntities({ ref: this.getRef(ref) })).slice(offset - 1, offset + 20 - 1);

    return of(page);
  }

  getRef(ref: GamesListStoreRefs) {
    switch (ref) {
      case 'recent':
        return recentEntitiesRef;
      case 'future':
        return futureEntitiesRef;
      case 'hyped':
        return hypedEntitiesRef;
    }
  }

  cleanList(ref: GamesListStoreRefs) {
    store.update(deleteAllEntities({ ref: this.getRef(ref) }), (state) => ({ ...state, [ref]: null }));
  }

  getListRequestDate(ref: GamesListStoreRefs) {
    return store.getValue()[ref];
  }

  setListRequestDate(ref: GamesListStoreRefs, timestamp: number) {
    store.update((state) => ({ ...state, [ref]: timestamp }));
  }
}

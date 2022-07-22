import { Injectable } from '@angular/core';
import { createState, Store, withProps } from '@ngneat/elf';
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

const { state, config } = createState(
  withProps<ListsUpdated>(null),
  withRecentEntities<Game>(),
  withFutureEntities<Game>(),
  withHypedEntities<Game>()
);

const gamesListStore = new Store({ name: 'games-list', state, config });

export const persist = persistState(gamesListStore, {
  key: 'games-list',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class GamesListStore {
  addGamesByRef(games: Game[], ref: GamesListStoreRefs) {
    gamesListStore.update(upsertEntities(games, { ref: this.getRef(ref) }));
  }

  getGamesCountByRef(ref: GamesListStoreRefs) {
    return gamesListStore.query(getEntitiesCount({ ref: this.getRef(ref) }));
  }

  getGamesByRef(ref: GamesListStoreRefs, offset: number) {
    // paginated query
    const page = gamesListStore
      .query(getAllEntities({ ref: this.getRef(ref) }))
      .slice(offset - 1, offset + 20 - 1);

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
    gamesListStore.update(deleteAllEntities({ ref: this.getRef(ref) }), (store) => ({ ...store, [ref]: null }));
  }

  getListRequestDate(ref: GamesListStoreRefs) {
    return gamesListStore.getValue()[ref];
  }

  setListRequestDate(ref: GamesListStoreRefs, timestamp: number) {
    gamesListStore.update((store) => ({ ...store, [ref]: timestamp }));
  }
}

import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import { upsertEntities, selectAllEntities, withEntities, entitiesPropsFactory } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { map } from 'rxjs';
import { Game } from './games.interface';

export type GamesStoreRefs = 'recent' | 'future' | 'hyped';

const { recentEntitiesRef, withRecentEntities } = entitiesPropsFactory('recent');
const { futureEntitiesRef, withFutureEntities } = entitiesPropsFactory('future');
const { hypedEntitiesRef, withHypedEntities } = entitiesPropsFactory('hyped');

const { state, config } = createState(
  withEntities<Game>(),
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
  games$ = gamesListStore.pipe(selectAllEntities());

  addGames(games: Game[]) {
    gamesListStore.update(upsertEntities(games));
  }

  addGamesByRef(games: Game[], reference: GamesStoreRefs) {
    let ref;

    if (reference === 'recent') {
      ref = recentEntitiesRef;
    } else if (reference === 'future') {
      ref = futureEntitiesRef;
    } else if (reference === 'hyped') {
      ref = hypedEntitiesRef;
    }

    gamesListStore.update(upsertEntities(games, { ref }));
  }

  getGamesByRef(ref: GamesStoreRefs) {
    // elf documentation does not provide a better way to access store entities by ref
    // each entity key is an array of objects that have their id as key,
    // so Object.values is needed to return the proper value

    return gamesListStore.pipe(
      map((store) => {
        const items = Object.values(store[`${ref}Entities`]);
        return items;
      })
    );
  }
}

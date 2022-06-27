import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import { upsertEntities, selectAllEntities, withEntities, getEntity, selectEntity } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { addDays, isAfter } from 'date-fns';
import { GameFullInfo } from './games.interface';

const { state, config } = createState(withEntities<GameFullInfo>());

const store = new Store({ name: 'games', state, config });

export const persist = persistState(store, {
  key: 'games',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class GamesStore {
  games$ = store.pipe(selectAllEntities());

  addGame(games: GameFullInfo[]) {
    store.update(upsertEntities(games));
  }

  getGameById(id: number) {
    return store.query(getEntity(id));
  }

  getGameEntity(id: number) {
    return store.pipe(selectEntity(id));
  }

  canRequestGame(id: number) {
    const game = store.query(getEntity(id));

    if (!game) {
      return false;
    }

    const lastUpdate = game.local_update;

    if (!lastUpdate) {
      return false;
    }

    if (isAfter(addDays(lastUpdate, 1), Date.now())) {
      return true;
    }

    return false;
  }
}

import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import {
  upsertEntities,
  selectAllEntities,
  withEntities,
  getEntity,
  withActiveId,
  selectActiveEntity,
  setActiveId,
  resetActiveId,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { addDays, isBefore } from 'date-fns';
import { GameFullInfo } from './games.interface';

const store = createStore({ name: 'games' }, withEntities<GameFullInfo>(), withActiveId());

export const persist = persistState(store, {
  key: 'games',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class GamesStore {
  games$ = store.pipe(selectAllEntities());
  activeGame$ = store.pipe(selectActiveEntity());

  addGame(games: GameFullInfo[]) {
    store.update(upsertEntities(games));
  }

  canRequestGame(id: number) {
    const lastUpdate = store.query(getEntity(id))?.local_update;

    if (!lastUpdate) {
      return true;
    }

    if (isBefore(new Date(), addDays(lastUpdate, 1))) {
      return false;
    }

    return true;
  }

  getGameById(id: number) {
    return store.query(getEntity(id));
  }

  setActiveGame(id: number) {
    store.update(setActiveId(id));
  }

  resetActiveGame() {
    store.update(resetActiveId());
  }
}

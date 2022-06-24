import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import { upsertEntities, selectAllEntities, withEntities } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

export interface Game {
  id: number;
  title: string;
}

const { state, config } = createState(withEntities<Game>());

const store = new Store({ name: 'games', state, config });

export const persist = persistState(store, {
  key: 'games',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class GamesStore {
  games$ = store.pipe(selectAllEntities());

  addGames(games: Game[]) {
    store.update(upsertEntities(games));
  }
}

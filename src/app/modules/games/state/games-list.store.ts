import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import { upsertEntities, selectAllEntities, withEntities } from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { Game } from './games.interface';

const { state, config } = createState(withEntities<Game>());

const store = new Store({ name: 'games-list', state, config });

export const persist = persistState(store, {
  key: 'games-list',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class GamesListStore {
  games$ = store.pipe(selectAllEntities());

  addGames(games: Game[]) {
    store.update(upsertEntities(games));
  }
}

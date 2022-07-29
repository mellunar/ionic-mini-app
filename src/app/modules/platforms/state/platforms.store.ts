import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import {
  upsertEntities,
  withEntities,
  getEntity,
  withActiveId,
  selectActiveEntity,
  setActiveId,
  resetActiveId,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { Platform } from './platforms.interface';

const { state, config } = createState(withEntities<Platform>(), withActiveId());

const store = new Store({ name: 'platforms', state, config });

export const persist = persistState(store, {
  key: 'platforms',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class PlatformsStore {
  activePlatform$ = store.pipe(selectActiveEntity());

  addPlatformById(platforms: Platform[]) {
    store.update(upsertEntities(platforms));
  }

  getPlatformById(id: number) {
    return store.query(getEntity(id));
  }

  setActivePlatform(id: number) {
    store.update(setActiveId(id));
  }

  resetActivePlatform() {
    store.update(resetActiveId());
  }
}

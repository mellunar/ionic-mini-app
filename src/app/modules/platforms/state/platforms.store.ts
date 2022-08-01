import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
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

const store = createStore({ name: 'platforms' }, withEntities<Platform>(), withActiveId());

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

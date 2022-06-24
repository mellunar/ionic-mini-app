import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { IGDBToken } from 'src/app/core/services/igdb/igdb.interface';

interface Token {
  token: IGDBToken;
}

const authStore = createStore({ name: 'auth' }, withProps<Token>({ token: null }));

export const persist = persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class AuthStore {
  token$ = authStore.pipe(select((state) => state.token));
  token = authStore.getValue().token;

  updateToken(token: IGDBToken) {
    authStore.update((state) => ({
      ...state,
      token,
    }));
  }

  resetToken() {
    this.updateToken(null);
  }
}

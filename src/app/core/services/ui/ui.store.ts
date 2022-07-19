import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { ToastMessage } from '../../components/toast/toast.interface';

interface UIStoreInterface {
  asyncToast: ToastMessage;
}

const initialState: UIStoreInterface = {
  asyncToast: null,
};

const uiStore = createStore({ name: 'ui' }, withProps<UIStoreInterface>(initialState));

export const persist = persistState(uiStore, {
  key: 'ui',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class UIStore {
  asyncToast$ = uiStore.pipe(select((state) => state.asyncToast));

  updateStore(key: string, value) {
    uiStore.update((state) => ({ ...state, [key]: value }));
  }
}

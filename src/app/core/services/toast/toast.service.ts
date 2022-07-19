import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage, ToastType } from '../../components/toast/toast.interface';
import { UIStore } from '../ui/ui.store';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = new Subject<ToastMessage>();

  constructor(private uiStore: UIStore) {}

  info(message: string, icon?: string) {
    this.createToast(message, 'neutral', icon);
  }

  success(message: string, icon?: string) {
    this.createToast(message, 'success', icon);
  }

  warning(message: string, icon?: string) {
    this.createToast(message, 'warning', icon);
  }

  error(message: string, icon?: string) {
    this.createToast(message, 'error', icon);
  }

  createToast(message: string, type: ToastType, icon?: string) {
    this.message.next({ message, type, icon });
  }

  setAsyncToast(message: string, type: ToastType, icon: string) {
    const toast = {
      message,
      type,
      icon,
    };

    this.uiStore.updateStore('asyncToast', toast);
  }

  removeAsyncToast() {
    this.uiStore.updateStore('asyncToast', null);
  }
}

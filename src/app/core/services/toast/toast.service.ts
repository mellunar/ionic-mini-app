import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage, ToastType } from '../../components/toast/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = new Subject<ToastMessage>();
  asyncToast$ = new Subject<ToastMessage>();

  constructor() {}

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
    this.asyncToast$.next({
      message,
      type,
      icon,
    });
  }

  removeAsyncToast() {
    this.asyncToast$.next(null);
  }
}

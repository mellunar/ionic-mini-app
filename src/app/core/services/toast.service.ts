import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage, ToastType } from '../components/toast/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message = new Subject<ToastMessage>();

  constructor() {}

  info(message: string) {
    this.createToast(message, 'neutral');
  }

  success(message: string) {
    this.createToast(message, 'success');
  }

  warning(message: string) {
    this.createToast(message, 'warning');
  }

  error(message: string) {
    this.createToast(message, 'error');
  }

  createToast(message: string, type: ToastType) {
    this.message.next({message, type});
  }
}

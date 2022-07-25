import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { UIStore } from '../../services/ui/ui.store';
import { ToastMessage } from '../toast/toast.interface';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent {
  messages: ToastMessage[] = [];
  asyncToast$: Observable<ToastMessage>;

  constructor(private toastService: ToastService, private uiStore: UIStore) {
    this.asyncToast$ = this.toastService.asyncToast$;

    this.toastService.message.subscribe((res) => {
      if (this.messages.length > 4) {
        this.messages.shift();
      }

      this.messages.push(res);

      setTimeout(() => {
        const index = this.messages.indexOf(res);
        if (index > -1) {
          this.closeMessage(index);
        }
      }, 10000);
    });
  }

  closeMessage(index: number) {
    if (index === 999) {
      this.toastService.removeAsyncToast();
      return;
    }

    this.messages.splice(index, 1);
  }
}

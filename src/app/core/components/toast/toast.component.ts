import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastMessage } from './toast.interface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  messages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {
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
    this.messages.splice(index, 1);
  }
}

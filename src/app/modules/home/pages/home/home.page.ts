import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private toastService: ToastService) {}

  ngOnInit() {}

  infoToast() {
    this.toastService.info('test info message', 'information-circle');
  }

  successToast() {
    this.toastService.success('success info message', '/assets/icons/patch-check-fill.svg');
  }

  warningToast() {
    this.toastService.warning('warning info message', 'warning');
  }

  errorToast() {
    this.toastService.error('error info message', 'cloud-offline');
  }
}

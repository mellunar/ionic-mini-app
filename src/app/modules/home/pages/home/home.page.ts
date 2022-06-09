import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(private toastService: ToastService) {}

  ngOnInit() {}

  infoToast() {
    this.toastService.info('test info message');
  }

  successToast() {
    this.toastService.success('success info message');
  }

  warningToast() {
    this.toastService.warning('warning info message');
  }

  errorToast() {
    this.toastService.error('error info message');
  }
}

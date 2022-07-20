import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.appInit();
  }

  appInit() {
    this.mobileViewPort();
    window.addEventListener('resize', this.mobileViewPort.bind(this));
  }

  mobileViewPort() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

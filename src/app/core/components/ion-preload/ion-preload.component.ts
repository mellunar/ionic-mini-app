import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ion-preload',
  templateUrl: './ion-preload.component.html',
  styleUrls: ['./ion-preload.component.scss'],
})
export class IonPreloadComponent implements OnInit {
  isVisible = true;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = false;
    }, 0);
  }
}

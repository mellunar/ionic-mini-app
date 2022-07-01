import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
})
export class CircularProgressComponent implements OnInit {
  @Input() rating = 0;

  value = 0;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.value = (this.rating * 251.2) / 100;
    }, 150);
  }
}

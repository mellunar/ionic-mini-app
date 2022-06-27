import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../state/games.interface';

@Component({
  selector: 'app-header-background',
  templateUrl: './header-background.component.html',
  styleUrls: ['./header-background.component.scss'],
})
export class HeaderBackgroundComponent implements OnInit {
  @Input() artworks: Image[];

  index: number;

  constructor() {}

  ngOnInit() {
    this.index = Math.floor(Math.random() * this.artworks.length);
  }
}

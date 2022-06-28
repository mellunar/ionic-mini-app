import { Component, Input, OnInit } from '@angular/core';
import { GenericInfo } from '../../state/games.interface';

@Component({
  selector: 'app-game-tags',
  templateUrl: './game-tags.component.html',
  styleUrls: ['./game-tags.component.scss'],
})
export class GameTagsComponent implements OnInit {
  @Input() tags: GenericInfo[];

  constructor() {}

  ngOnInit() {}
}

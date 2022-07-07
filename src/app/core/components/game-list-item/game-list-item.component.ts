import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/modules/games/state/games.interface';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
})
export class GameListItemComponent implements OnInit {
  @Input() game: Game;
  @Input() titleSize: 'normal' | 'small' = 'normal';

  constructor() {}

  ngOnInit() {}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game, GenericInfo, Ratings } from 'src/app/modules/games/state/games.interface';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
})
export class GameListItemComponent implements OnInit {
  @Input() game: Game;
  @Input() titleSize: 'normal' | 'small' = 'small';
  @Input() enableOutput = false;

  @Output() openCategories = new EventEmitter<GenericInfo[]>();
  @Output() openDates = new EventEmitter<any>();
  @Output() openPlatforms = new EventEmitter<any>();
  @Output() openRatings = new EventEmitter<Ratings>();

  constructor() {}

  ngOnInit() {}

  openCategoriesModal(tags) {
    if (!this.enableOutput) {
      return;
    }

    this.openCategories.emit(tags);
  }

  openPlatformsModal() {
    if (!this.enableOutput) {
      return;
    }

    this.openPlatforms.emit();
  }

  openRatingsModal(ratings) {
    if (!this.enableOutput) {
      return;
    }

    this.openRatings.emit(ratings);
  }

  openDatesModal() {
    if (!this.enableOutput) {
      return;
    }

    this.openDates.emit();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../../state/games.interface';

@Component({
  selector: 'app-related-games-modal',
  templateUrl: './related-games-modal.component.html',
  styleUrls: ['./related-games-modal.component.scss'],
})
export class RelatedGamesModal implements OnInit {
  @Input() dlcs: Game[];
  @Input() expansions: Game[];
  @Input() genericList: Game[];

  @Input() headerTitle: string;

  games: Game[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    let games = [];

    if (this.dlcs?.length) {
      games = games.concat(this.dlcs);
    }

    if (this.expansions?.length) {
      games = games.concat(this.expansions);
    }

    if (!this.genericList) {
      this.sortByDate(games);
    } else {
      this.games = this.genericList;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private sortByDate(games) {
    this.games = games.sort((a, b) => {
      if (a.first_release_date > b.first_release_date) {
        return 1;
      }

      if (a.first_release_date < b.first_release_date) {
        return -1;
      }

      return 0;
    });

    this.filterUnlisted();
  }

  private filterUnlisted() {
    this.games = this.games.filter((game) => {
      return game.status !== 7 && game.status !== 8;
    });
  }
}

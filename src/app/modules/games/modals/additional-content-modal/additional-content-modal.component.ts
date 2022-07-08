import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../../state/games.interface';

@Component({
  selector: 'app-additional-content-modal',
  templateUrl: './additional-content-modal.component.html',
  styleUrls: ['./additional-content-modal.component.scss'],
})
export class AdditionalContentModal implements OnInit {
  @Input() dlcs: Game[];
  @Input() expansions: Game[];

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

    this.sortByDate(games);
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

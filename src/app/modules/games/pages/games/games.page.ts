import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { Game } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';
import { GamesListStore, GamesListStoreRefs } from '../../state/games-list.store';
import { UIService } from 'src/app/core/services/ui/ui.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  loading = false;
  infiniteScrollDisabled = false;
  segment: GamesListStoreRefs = 'recent';

  games = {
    recent: [],
    future: [],
    hyped: [],
  };

  constructor(
    private gamesService: GamesService,
    private gamesListStore: GamesListStore,
    private uiService: UIService,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.getGames();
  }

  ionViewWillEnter() {
    this.uiService.setTitle('Games');
  }

  getGames(event?) {
    this.loading = true;

    if (this.gamesListStore.getGamesCountByRef(this.segment) < 100) {
      this.infiniteScrollDisabled = false;
    }

    const offset = this.games[this.segment].length + 1;

    this.gamesService
      .getGamesByStatus(offset, this.segment)
      .pipe(
        tap((games: Game[]) => {
          if (games.length < 1) {
            this.infiniteScrollDisabled = true;
          } else {
            this.games[this.segment].push(...games);
          }
        }),
        finalize(() => {
          this.loading = false;
          if (event) event.target.complete();
        })
      )
      .subscribe();
  }

  openSidebar() {
    this.menuController.open('games-menu');
  }

  segmentChange(event) {
    this.segment = event.detail.value;
    this.getGames();
  }
}

import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { Game } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';
import { GamesListStore, GamesStoreRefs } from '../../state/games-list.store';
import { UIService } from 'src/app/core/services/ui/ui.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  isOpen = false;

  loading = false;
  infiniteScrollDisabled = false;
  segment: GamesStoreRefs = 'recent';

  games = {
    recent: [],
    future: [],
    hyped: [],
  };

  constructor(
    private gamesService: GamesService,
    private gamesListStore: GamesListStore,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.getGames();
  }

  ionViewWillEnter() {
    this.uiService.setTitle('Games');
  }

  getGames(event?) {
    this.loading = true;

    const offset = this.games[this.segment].length + 1;

    this.gamesService
      .getGamesByStatus(offset, this.segment)
      .pipe(
        tap((games: Game[]) => {
          if (games.length === 0) {
            this.infiniteScrollDisabled = true;
            return;
          }
          this.games[this.segment].push(...games);
        }),
        finalize(() => {
          this.loading = false;
          if (event) event.target.complete();
        })
      )
      .subscribe();
  }

  /*
  getGames() {
    this.gamesService
      .getGames([
        14362, 19560, 11582, 25566, 27053, 141503, 1185, 72870, 1877, 96437, 112874, 140839, 1905, 7100, 110248,
        22917, 134588, 28540, 1186, 110586, 3070, 3225,
      ])
      .pipe()
      .subscribe();
  }
  */

  segmentChange(event) {
    this.segment = event.detail.value;
    this.getGames();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

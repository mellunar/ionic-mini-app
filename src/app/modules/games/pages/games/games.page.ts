import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';
import { GamesListStore } from '../../state/games-list.store';
import { UIService } from 'src/app/core/services/ui/ui.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  isOpen = false;
  games$: Observable<Game[]>;
  count = 0;

  constructor(
    private gamesService: GamesService,
    private gamesListStore: GamesListStore,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.games$ = this.gamesListStore.games$;
  }

  ionViewWillEnter() {
    this.uiService.setTitle('Games');
  }

  getGames() {
    this.gamesService
      .getGames([
        14362, 19560, 11582, 25566, 27053, 141503, 1185, 72870, 1877, 96437, 112874, 140839, 1905, 7100, 110248,
        22917, 134588, 28540, 1186, 110586, 3070, 3225,
      ])
      .pipe()
      .subscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';
import { GamesListStore } from '../../state/games-list.store';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  isOpen = false;
  games$: Observable<Game[]>;
  count = 0;

  constructor(private gamesService: GamesService, private gamesListStore: GamesListStore) {}

  ngOnInit() {
    this.games$ = this.gamesListStore.games$;
  }

  getGames() {
    this.gamesService.getGames([14362, 549, 11582, 25566, 27053, 141503, 1185, 499]).pipe().subscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

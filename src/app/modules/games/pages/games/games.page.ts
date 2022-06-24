import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GamesStore } from '../../state/games.store';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  isOpen = false;
  games$: Observable<Game[]>;
  count = 0;

  constructor(private gamesStore: GamesStore) {}

  ngOnInit() {
    this.games$ = this.gamesStore.games$;
  }

  add() {
    this.count += 1;

    this.gamesStore.addGames([{ id: this.count, title: `Teste ${this.count}` }]);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

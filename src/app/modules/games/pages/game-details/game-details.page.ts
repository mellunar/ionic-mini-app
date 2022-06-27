import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GameFullInfo } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';
import { GamesStore } from '../../state/games.store';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  game$: Observable<GameFullInfo>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private gamesStore: GamesStore
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (!params.id || params.id === '') {
        return;
      }

      const id = Number(params.id);

      this.getGame(id);
      this.game$ = this.gamesStore.getGameEntity(id);
    });
  }

  getGame(id: number) {
    this.gamesService.getGame(id).pipe().subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { GameFullInfo } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  games: GameFullInfo[];

  constructor(private toastService: ToastService, private gamesService: GamesService) {}

  ngOnInit() {}

  getGame() {
    this.gamesService
      .getGame('14362, 549, 11582, 25566, 27053, 141503, 1185, 499')
      .pipe(
        tap((game) => {
          console.log(game);
          this.games = game;
        }),
        catchError((err) => {
          this.toastService.error(err.message);
          throw err;
        })
      )
      .subscribe();
  }
}

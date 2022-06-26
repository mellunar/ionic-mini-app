import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { GamesService } from '../../state/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  constructor(private toastService: ToastService, private gamesService: GamesService) {}

  ngOnInit() {}

  getGame() {
    this.gamesService
      .getGame('14362')
      .pipe(
        tap((game) => {
          console.log(game);
        }),
        catchError((err) => {
          this.toastService.error(err.message);
          throw err;
        })
      )
      .subscribe();
  }
}

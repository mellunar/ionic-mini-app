import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { GamesListStore } from './games-list.store';
import { Game, GameFullInfo } from './games.interface';
import { GamesStore } from './games.store';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private gameFields = [
    '*',
    'age_ratings.*',
    'artworks.*',
    'cover.url',
    'franchises.*',
    'game_engines.id',
    'game_engines.name',
    'game_engines.logo.alpha_channel',
    'game_engines.logo.url',
    'game_modes.*',
    'genres.*',
    'involved_companies.*',
    'involved_companies.company.id',
    'involved_companies.company.name',
    'involved_companies.company.logo.alpha_channel',
    'involved_companies.company.logo.url',
    'keywords.*',
    'player_perspectives.*',
    'platforms.abbreviation',
    'platforms.name',
    'platforms.platform_logo.url',
    'screenshots.*',
    'themes.*',
    'videos.*',
    'websites.category',
    'websites.trusted',
    'websites.url',
  ];

  private gameResumedFields = ['cover.url', 'id', 'name', 'slug'];

  private gameKeys = [
    'dlcs',
    'expansions',
    //'franshise.games',
    'franchises.games',
    'parent_game',
    'ports',
    'remakes',
    'remasters',
    'similar_games',
    'version_parent',
  ];

  private excludeFields =
    'alternative_names, bundles, checksum, expanded_games, external_games, forks, multiplayer_modes, standalone_expansions, tags, updated_at, url';

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private gamesStore: GamesStore,
    private gamesListStore: GamesListStore
  ) {}

  formGameFields() {
    const fields = [];

    for (let key of this.gameKeys) {
      for (let field of this.gameResumedFields) {
        fields.push(`${key}.${field}`);
      }
    }

    return `${this.gameFields.join(', ')}, ${fields.join(', ')}`;
  }

  getGame(id: number) {
    const canRequest = this.gamesStore.canRequestGame(id);

    if (!canRequest) {
      // keep console until finish developing game details
      console.log(this.gamesStore.getGameById(id));

      return of([this.gamesStore.getGameById(id)]);
    } else if (canRequest && this.gamesStore.getGameById(id)) {
      this.toastService.info('Updating game data', 'cloud-download');
    }

    const query = `where id = (${id}); fields ${this.formGameFields()}; exclude ${this.excludeFields};`;

    return this.http.post<GameFullInfo[]>('/api/game', query).pipe(
      tap((game) => {
        if (!game.length) {
          // redirect to 404
          return;
        }

        game[0].local_update = Date.now();
        this.gamesStore.addGame(game);
      }),
      catchError((err) => {
        this.toastService.error(err.message);
        throw err;
      })
    );
  }

  getGames(id?: number[]) {
    const query = `where id = (${id.join(',')}); fields cover.url, id, name, slug; limit 20;`;

    return this.http.post<Game[]>('/api/game', query).pipe(
      tap((games) => {
        this.gamesListStore.addGames(games);
      }),
      catchError((err) => {
        this.toastService.error(err.message);
        throw err;
      })
    );
  }
}

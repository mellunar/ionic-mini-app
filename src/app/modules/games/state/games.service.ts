import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { GamesListStore } from './games-list.store';
import { Game, GameFullInfo } from './games.interface';
import { GamesStore } from './games.store';
import { SearchPreferences } from './search.store';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  searchItemsLimit = 20;

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
    'player_perspectives.*',
    'platforms.abbreviation',
    'platforms.platform_family.name',
    'platforms.name',
    'platforms.platform_logo.url',
    'release_dates.date',
    'release_dates.platform.name',
    'release_dates.platform.platform_family.name',
    'release_dates.region',
    'screenshots.*',
    'themes.*',
    'videos.*',
    'websites.category',
    'websites.trusted',
    'websites.url',
  ];

  private gameResumedFields = [
    'aggregated_rating',
    'aggregated_rating_count',
    'category',
    'cover.url',
    'first_release_date',
    'genres.name',
    'id',
    'name',
    'platforms',
    'rating',
    'rating_count',
    'slug',
    'status',
    'themes.name',
  ];

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
    'alternative_names, bundles, checksum, expanded_games, external_games, forks, keywords, multiplayer_modes, standalone_expansions, tags, updated_at, url';

  private gameListFields =
    'aggregated_rating, aggregated_rating_count, cover.url, first_release_date, genres.name, id, name, platforms, rating, rating_count, slug, status, themes.name, total_rating, total_rating_count, updated_at';

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
    const query = `where id = (${id.join(',')}); fields ${this.gameListFields}; limit 50;`;

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

  searchByTerm(term: string, param?: string, offset?: number, filters?: SearchPreferences) {
    let paramToSearch;
    let initialOffset = '';
    let sort = '';

    const whereParams = [];

    if (!param) {
      paramToSearch = 'name';
    } else if (param !== 'name' && param !== 'keywords') {
      paramToSearch = `${param}.name`;
    } else {
      paramToSearch = param;
    }

    if (filters) {
      const keys = ['platforms', 'themes', 'genres', 'game_modes', 'player_perspectives'];

      if (!param) {
        paramToSearch = filters.parameter;
      }

      if (filters.sortBy !== 'none') {
        sort = ` sort ${filters.sortBy} ${filters.sortOrder};`;
      }

      keys.forEach((key) => {
        if (filters[key]?.length > 0) {
          whereParams.push(`${key} = [${filters[key].join(',')}]`);
        }
      });

      if (!filters.showUnrated) {
        whereParams.push(`${filters.ratingBy} >= ${filters.rating.lower}`);
        whereParams.push(`${filters.ratingBy} <= ${filters.rating.upper}`);
      }

      const ignoreKeys = ['genres', 'themes', 'status'];

      ignoreKeys.forEach((key) => {
        if (filters?.ignore[key]?.length > 0) {
          whereParams.push(`genres != [${filters.ignore[key].join(',')}]`);
        }
      });
    }

    if (offset && offset > 2) {
      initialOffset = ` offset ${offset};`;
    }

    const formattedTerm = `${paramToSearch} ~ *"${term}"*`;
    const where = whereParams.length > 0 ? whereParams.join(' & ') : '';

    const query = `where ${where.length < 1 ? formattedTerm : `(${formattedTerm} & ${where})`}; fields ${
      this.gameListFields
    }; limit 20;${initialOffset}${sort}`;

    return this.http.post<Game[]>('/api/game', query).pipe(
      catchError((err) => {
        if (err.status === 400) {
          this.toastService.error('Invalid search parameters');
        } else {
          this.toastService.error(err.message);
        }
        throw err;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private gameFields = [
    '*',
    'age_ratings.*',
    'artworks.*',
    'cover.url',
    'franchise.*',
    'franchises.*',
    'game_engines.id',
    'game_engines.name',
    'game_engines.logo.url',
    'game_modes.*',
    'involved_companies.*',
    'involved_companies.company.id',
    'involved_companies.company.name',
    'involved_companies.company.logo.url',
    'keywords.*',
    'player_perspectives.*',
    'screenshots.*',
    'themes.*',
    'videos.*',
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

  constructor(private http: HttpClient) {}

  formGameFields() {
    const fields = [];

    for (let key of this.gameKeys) {
      for (let field of this.gameResumedFields) {
        fields.push(`${key}.${field}`);
      }
    }

    return `${this.gameFields.join(', ')}, ${fields.join(', ')}`;
  }

  getGame(id: string | number) {
    const query = `where id = (${id}); fields ${this.formGameFields()}; exclude ${this.excludeFields};`;
    return this.http.post<any>('/api/game', query);
  }
}

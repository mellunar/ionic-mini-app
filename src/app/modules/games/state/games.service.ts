import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGame(id: string | number) {
    const query = `where id = (${id}); fields age_ratings.*, artworks.*, bundles.*, category, dlcs.*, expansions.*, hypes, keywords.*, follows, game_engines.*, involved_companies.company.parent.*, cover.url, screenshots.url, created_at, first_release_date, game_modes.name, genres.name, name, platforms.*, slug, summary, franchise.*, franchises.*, multiplayer_modes.*, parent_game.*, player_perspectives.*, ports.*, rating, rating_count, release_dates.*;`;
    return this.http.post<any>('/api/game', query);
  }
}

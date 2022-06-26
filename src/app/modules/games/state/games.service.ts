import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGame(id: string | number) {
    const query = `where id = ${id}; fields cover.url, screenshots.url, created_at, first_release_date, game_modes.name, genres.name, name, platforms.name, slug, summary;`;
    return this.http.post<any>('/api/game', query);
  }
}

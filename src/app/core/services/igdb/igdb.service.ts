import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGDBToken } from './igdb.interface';
import categories from 'src/assets/static/categories.json';
import modes from 'src/assets/static/game_modes.json';
import platforms from 'src/assets/static/platforms.json';
import perspectives from 'src/assets/static/player_perspectives.json';
import status from 'src/assets/static/status.json';

@Injectable({
  providedIn: 'root',
})
export class IgdbService {
  constructor(private http: HttpClient) {}

  getToken() {
    return this.http.post<IGDBToken>('/api/token', 'token');
  }

  getCategoriesOptions() {
    return categories.data;
  }

  getModesOptions() {
    return modes.data;
  }

  getPlatformsOptions() {
    return platforms.data;
  }

  getPerspectivesOptions() {
    return perspectives.data;
  }

  getStatusOptions() {
    return status.data;
  }
}

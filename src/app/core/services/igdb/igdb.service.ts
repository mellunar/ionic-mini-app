import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGDBToken } from './igdb.interface';

@Injectable({
  providedIn: 'root',
})
export class IgdbService {
  constructor(private http: HttpClient) {}

  getToken() {
    return this.http.post<IGDBToken>('/api/token', 'token');
  }
}

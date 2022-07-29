import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  currentRoute: string;

  constructor(private title: Title) {}

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }

  setTitle(page: string) {
    this.title.setTitle(page);
  }
}

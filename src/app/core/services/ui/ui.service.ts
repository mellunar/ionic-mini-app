import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private title: Title) {}

  setTitle(page: string) {
    this.title.setTitle(page);
  }
}

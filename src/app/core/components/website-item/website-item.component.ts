import { Component, Input, OnInit } from '@angular/core';
import { Website } from 'src/app/modules/games/state/games.interface';

@Component({
  selector: 'app-website-item',
  templateUrl: './website-item.component.html',
  styleUrls: ['./website-item.component.scss'],
})
export class WebsiteItemComponent implements OnInit {
  @Input() website: Website;

  background: string;
  icon: string;
  text: string;
  trusted: boolean;

  constructor() {}

  ngOnInit() {
    this.trusted = this.website.trusted;

    switch (this.website.category) {
      case 1:
        return this.setValues('var(--color-official)', '/assets/icons/patch-check-fill.svg', 'Official');
      case 2:
        return this.setValues('var(--color-blue-800)', 'globe-outline', 'Fandom');
      case 3:
        return this.setValues('var(--color-wikipedia)', '/assets/icons/fa-wikipedia.svg', 'Wikipedia');
      case 4:
        return this.setValues('var(--color-facebook)', 'logo-facebook', 'Facebook');
      case 5:
        return this.setValues('var(--color-twitter)', 'logo-twitter', 'Twitter');
      case 6:
        return this.setValues('var(--color-twitch)', 'logo-twitch', 'Twitch');
      case 8:
        return this.setValues('var(--color-instagram)', 'logo-instagram', 'Instagram');
      case 9:
        return this.setValues('var(--color-youtube)', 'logo-youtube', 'YouTube');
      case 10:
        return this.setValues('var(--color-apple)', 'logo-apple', 'iPhone');
      case 11:
        return this.setValues('var(--color-apple)', 'logo-apple', 'iPad');
      case 12:
        return this.setValues('var(--color-android)', 'logo-android', 'Android');
      case 13:
        return this.setValues('var(--color-steam)', 'logo-steam', 'Steam');
      case 14:
        return this.setValues('var(--color-reddit)', '/assets/icons/fa-reddit.svg', 'Reddit');
      case 15:
        return this.setValues('var(--color-blue-800)', 'globe-outline', 'Itch.io');
      case 16:
        return this.setValues('var(--color-blue-800)', 'globe-outline', 'Epic Games');
      case 17:
        return this.setValues('var(--color-blue-800)', 'globe-outline', 'GOG');
      case 18:
        return this.setValues('var(--color-discord)', '/assets/icons/discord.svg', 'Discord');
    }
  }

  setValues(bg: string, icon: string, text: string) {
    this.background = bg;
    this.icon = icon;
    this.text = text;
  }
}

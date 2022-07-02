import { Component, Input, OnInit } from '@angular/core';
import { Platform } from 'src/app/modules/games/state/games.interface';

@Component({
  selector: 'app-platform-icon',
  templateUrl: './platform-icon.component.html',
  styleUrls: ['./platform-icon.component.scss'],
})
export class PlatformIconComponent implements OnInit {
  @Input() platform: Partial<Platform>;

  name: string;
  src: string;
  color: string;

  constructor() {}

  ngOnInit() {
    if (this.platform.platform_family /* && !this.platform.name.includes('Switch')*/) {
      switch (this.platform.platform_family.name) {
        case 'PlayStation':
          return this.valueToReturn('var(--color-playstation)', 'logo-playstation');
        case 'Xbox':
          return this.valueToReturn('var(--color-xbox)', 'logo-xbox');
        case 'Nintendo':
          return this.valueToReturn('var(--color-nintendo)', '/assets/icons/nintendo-switch.svg');
        case 'Linux':
          return this.valueToReturn('var(--color-linux)', 'logo-tux');
        default:
          return this.valueToReturn('var(--color-text-alt)', '/assets/icons/joystick.svg');
      }
    } else {
      switch (this.platform.name) {
        case 'Mac':
        case 'iOS':
          return this.valueToReturn('var(--color-apple)', 'logo-apple');
        case 'PC (Microsoft Windows)':
        case 'Windows Phone':
          return this.valueToReturn('var(--color-windows)', 'logo-windows');
        case 'Linux':
          return this.valueToReturn('var(--color-linux)', 'logo-tux');
        case 'Android':
          return this.valueToReturn('var(--color-android)', 'logo-android');
        /*case 'Nintendo Switch':
          return this.valueToReturn('var(--color-nintendo)', '/assets/icons/nintendo-switch.svg');*/
        case 'Google Stadia':
          return this.valueToReturn('var(--color-stadia)', '/assets/icons/stadia.svg');
        default:
          return this.valueToReturn('var(--color-blue-800)', '/assets/icons/joystick.svg');
      }
    }
  }

  private valueToReturn(color: string, icon: string) {
    if (icon.includes('/assets')) {
      this.src = icon;
    } else {
      this.name = icon;
    }

    this.color = color;
  }
}

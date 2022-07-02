import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name: string;
  @Input() src: string;
  @Input() title: string;
  @Input() keepEvents = false;
  @Input() inheritSize = false;
}

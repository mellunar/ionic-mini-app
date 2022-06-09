import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name = '';
  @Input() src = '';
  @Input() title = '';
  @Input() keepEvents = false;
  @Input() noMargin = false;
  @Input() inheritSize = false;
}

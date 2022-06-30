import { Component } from '@angular/core';
import { UIService } from 'src/app/core/services/ui/ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'platforms.page.html',
  styleUrls: ['platforms.page.scss'],
})
export class PlatformsPage {
  constructor(private uiService: UIService) {}

  ionViewWillEnter() {
    this.uiService.setTitle('Platforms');
  }
}

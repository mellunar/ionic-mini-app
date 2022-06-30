import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/core/services/ui/ui.service';

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.page.html',
  styleUrls: ['./platform-details.page.scss'],
})
export class PlatformDetailsPage implements OnInit {
  constructor(private uiService: UIService) {}

  ngOnInit() {
    // to do: param subscription
  }

  // to do: move to param subscription
  ionViewWillEnter() {
    this.uiService.setTitle('Games');
  }
}

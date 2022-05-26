import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab = 'home';

  constructor() {}

  tabChanged(event) {
    this.selectedTab = event.tab;
  }
}

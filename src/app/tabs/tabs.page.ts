import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @ViewChild(IonTabs, { static: true }) private ionTabs: IonTabs;

  selectedTab = 'home';

  constructor() {
    setTimeout(() => {
      if (this.ionTabs) {
        this.selectedTab = this.ionTabs.getSelected();
      }
    }, 0);
  }

  tabChanged(event) {
    this.selectedTab = event.tab;
  }
}

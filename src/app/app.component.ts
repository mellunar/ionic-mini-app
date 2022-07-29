import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UIService } from './core/services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private uiService: UIService, private router: Router) {
    this.appInit();
  }

  appInit() {
    this.routerSubscriber();
  }

  routerSubscriber() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.uiService.setCurrentRoute(event.url);
      }
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/core/services/ui/ui.service';
import { PlatformsStore } from '../../state/platforms.store';

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.page.html',
  styleUrls: ['./platform-details.page.scss'],
})
export class PlatformDetailsPage implements OnInit, OnDestroy {
  loading = false;

  paramSubscription$: Subscription;

  constructor(
    private uiService: UIService,
    private activatedRoute: ActivatedRoute,
    private platformsStore: PlatformsStore
  ) {}

  ngOnInit() {
    this.paramSubscription$ = this.activatedRoute.params.subscribe((params) => {
      if (!params.id || params.id === '') {
        return;
      }

      const id = Number(params.id);

      this.getPlatform(id);

      this.platformsStore.setActivePlatform(id);
    });
  }

  ngOnDestroy() {
    if (!this.uiService.currentRoute.match(/(platforms\/[0-9]*)/)) {
      this.paramSubscription$.unsubscribe();
      this.platformsStore.resetActivePlatform();
    }
  }

  // to do: move to getPlatform tap
  ionViewWillEnter() {
    this.uiService.setTitle('Platform');
  }

  getPlatform(id: number) {
    console.log(id);
  }
}

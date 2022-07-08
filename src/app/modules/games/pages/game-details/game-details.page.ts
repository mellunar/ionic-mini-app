import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, Subscription, tap } from 'rxjs';
import { PopoverComponent } from 'src/app/core/components/popover/popover.component';
import { WebsitesModal } from 'src/app/core/modals/websites-modal/websites-modal.component';
import { UIService } from 'src/app/core/services/ui/ui.service';
import { RelatedGamesModal } from '../../modals/related-games-modal/related-games-modal.component';
import { CategoriesModal } from '../../modals/categories-modal/categories-modal.component';
import { PlatformsModal } from '../../modals/platforms-modal/platforms-modal.component';
import { RatingsModal } from '../../modals/ratings-modal/ratings-modal.component';
import { ReleaseDatesModal } from '../../modals/release-dates-modal/release-dates-modal.component';
import { ScreenshotsModal } from '../../modals/screenshots-modal/screenshots-modal.component';
import { YoutubeModal } from '../../modals/youtube-modal/youtube-modal.component';
import {
  Game,
  GameFullInfo,
  GenericInfo,
  Image,
  Platform,
  Ratings,
  ReleaseDate,
  Website,
} from '../../state/games.interface';
import { GamesService } from '../../state/games.service';
import { GamesStore } from '../../state/games.store';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit, OnDestroy {
  game$: Observable<GameFullInfo>;
  paramSubscription$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private gamesStore: GamesStore,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.paramSubscription$ = this.activatedRoute.params.subscribe((params) => {
      if (!params.id || params.id === '') {
        return;
      }

      const id = Number(params.id);

      this.game$ = this.gamesStore.getGameEntity(id);

      this.getGame(id);
    });
  }

  ngOnDestroy() {
    this.paramSubscription$.unsubscribe();
  }

  getGame(id: number) {
    this.gamesService
      .getGame(id)
      .pipe(
        tap((game) => {
          if (game.length) {
            this.uiService.setTitle(game[0].name);
          }
        })
      )
      .subscribe();
  }

  async openAdditionalContentModal(dlcs: Game[], expansions: Game[]) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: RelatedGamesModal,
      componentProps: {
        dlcs,
        expansions,
      },
      cssClass: 'c-ion-modal c-ion-modal--full',
    });

    await modal.present();
  }

  async openCategoriesModal(tags: GenericInfo[]) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: CategoriesModal,
      componentProps: {
        tags,
      },
    });

    await modal.present();
  }

  async openNamePopover(event, name: string) {
    const popover = await this.popoverController.create({
      mode: 'ios',
      component: PopoverComponent,
      componentProps: {
        text: name,
      },
      event,
    });

    await popover.present();
  }

  async openPlatformsModal(platforms: Partial<Platform>[]) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: PlatformsModal,
      componentProps: {
        platforms,
      },
    });

    await modal.present();
  }

  async openRatingsModal(ratings: Ratings) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: RatingsModal,
      componentProps: {
        ratings,
      },
    });

    await modal.present();
  }

  async openRelatedGamesModal(genericList: Game[], headerTitle?: string) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: RelatedGamesModal,
      componentProps: {
        genericList,
        headerTitle,
      },
      cssClass: 'c-ion-modal c-ion-modal--full',
    });

    await modal.present();
  }

  async openReleaseDatesModal(dates: ReleaseDate[]) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: ReleaseDatesModal,
      componentProps: {
        dates,
      },
    });

    await modal.present();
  }

  async openScreenshotsModal(screenshots: Image[], index: number) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: ScreenshotsModal,
      componentProps: {
        screenshots,
        index,
      },
      cssClass: 'c-ion-modal c-ion-modal--media c-ion-modal--img',
    });

    await modal.present();
  }

  async openWebsitesModal(websites: Website[]) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: WebsitesModal,
      componentProps: {
        websites,
      },
    });

    await modal.present();
  }

  async openYoutubeModal(video: string) {
    const modal = await this.modalController.create({
      mode: 'ios',
      component: YoutubeModal,
      componentProps: {
        video,
      },
      cssClass: 'c-ion-modal c-ion-modal--media c-ion-modal--video',
    });

    await modal.present();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, Subscription, tap } from 'rxjs';
import { PopoverComponent } from 'src/app/core/components/popover/popover.component';
import { UIService } from 'src/app/core/services/ui/ui.service';
import { PlatformsModal } from '../../modals/platforms-modal/platforms-modal.component';
import { GameFullInfo, Platform } from '../../state/games.interface';
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
          this.uiService.setTitle(game[0].name);
        })
      )
      .subscribe();
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
}

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { IonPreloadComponent } from './components/ion-preload/ion-preload.component';
import { PopoverComponent } from './components/popover/popover.component';
import { ModalComponent } from './components/modal/modal.component';
import { ImageUrlPipe } from './pipes/image-url/image-url.pipe';
import { PluralPipe } from './pipes/plural/plural.pipe';
import { RatingBackgroundPipe } from './pipes/rating-background/rating-background.pipe';
import { TagOptimizerPipe } from './pipes/tag-optimizer/tag-optimizer.pipe';
import { UnixTimestampPipe } from './pipes/unix-timestamp/unix-timestamp.pipe';
import { PlatformIconComponent } from './components/platform-icon/platform-icon.component';
import { FlagIconComponent } from './components/flag-icon/flag-icon.component';
import { ReleaseIconComponent } from './components/release-icon/release-icon.component';
import { CollapsableTextComponent } from './components/collapsable-text/collapsable-text.component';
import { PicSliderComponent } from './components/pic-slider/pic-slider.component';
import { WebsiteItemComponent } from './components/website-item/website-item.component';
import { WebsitesModal } from './modals/websites-modal/websites-modal.component';
import { RatingComponent } from './components/rating/rating.component';
import { TagsComponent } from './components/tags/tags.component';
import { GameListItemComponent } from './components/game-list-item/game-list-item.component';
import { RouterModule } from '@angular/router';
import { GameStatusPipe } from './pipes/game-status/game-status.pipe';
import { GameListItemLoadingComponent } from './components/game-list-item-loading/game-list-item-loading.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ToastComponent,
    IconComponent,
    IonPreloadComponent,
    ImageUrlPipe,
    TagOptimizerPipe,
    PopoverComponent,
    ModalComponent,
    RatingBackgroundPipe,
    PluralPipe,
    UnixTimestampPipe,
    PlatformIconComponent,
    FlagIconComponent,
    ReleaseIconComponent,
    CollapsableTextComponent,
    PicSliderComponent,
    WebsiteItemComponent,
    WebsitesModal,
    RatingComponent,
    TagsComponent,
    GameListItemComponent,
    GameStatusPipe,
    GameListItemLoadingComponent,
    InputSelectComponent,
    ToastContainerComponent,
  ],
  imports: [CommonModule, IonicModule, SwiperModule, RouterModule],
  exports: [
    ButtonComponent,
    ToastComponent,
    IconComponent,
    IonPreloadComponent,
    ImageUrlPipe,
    TagOptimizerPipe,
    PopoverComponent,
    ModalComponent,
    RatingBackgroundPipe,
    PluralPipe,
    UnixTimestampPipe,
    PlatformIconComponent,
    FlagIconComponent,
    ReleaseIconComponent,
    CollapsableTextComponent,
    PicSliderComponent,
    WebsiteItemComponent,
    WebsitesModal,
    RatingComponent,
    TagsComponent,
    GameListItemComponent,
    GameStatusPipe,
    GameListItemLoadingComponent,
    InputSelectComponent,
    ToastContainerComponent,
  ],
  providers: [DatePipe],
})
export class CoreModule {}

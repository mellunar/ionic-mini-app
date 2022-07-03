import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { IonicModule } from '@ionic/angular';
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
  ],
  imports: [CommonModule, IonicModule],
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
  ],
  providers: [DatePipe],
})
export class CoreModule {}

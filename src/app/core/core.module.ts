import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { IonPreloadComponent } from './components/ion-preload/ion-preload.component';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { TagOptimizerPipe } from './pipes/tag-optimizer.pipe';
import { PopoverComponent } from './components/popover/popover.component';
import { ModalComponent } from './components/modal/modal.component';
import { RatingBackgroundPipe } from './pipes/rating-background.pipe';

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
  ],
})
export class CoreModule {}

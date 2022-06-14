import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlatformsPage } from './pages/platforms/platforms.page';
import { PlatformsRoutingModule } from './platforms-routing.module';
import { PlatformDetailsPage } from './pages/platform-details/platform-details.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PlatformsPage }]),
    PlatformsRoutingModule,
  ],
  declarations: [PlatformsPage, PlatformDetailsPage],
})
export class PlatformsModule {}

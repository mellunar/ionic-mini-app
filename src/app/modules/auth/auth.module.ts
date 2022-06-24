import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthRoutingModule } from './auth-routing.module';
import { LandingPage } from './pages/landing/landing.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AuthRoutingModule, CoreModule],
  declarations: [LandingPage],
})
export class AuthModule {}

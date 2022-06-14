import { IonicModule } from '@ionic/angular';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { HomePage } from './pages/home/home.page';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from 'src/app/core/core.module';

registerLocaleData(localePt);
@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomeRoutingModule, CoreModule],
  declarations: [HomePage],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class HomeModule {}

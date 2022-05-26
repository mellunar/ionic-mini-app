import { IonicModule } from '@ionic/angular';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import localePt from '@angular/common/locales/pt';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

registerLocaleData(localePt);
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SharedModule,
  ],
  declarations: [Tab1Page],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class Tab1PageModule {}

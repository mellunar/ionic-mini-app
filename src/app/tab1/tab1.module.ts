import { IonicModule } from '@ionic/angular';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import localePt from '@angular/common/locales/pt';

import { Tab1PageRoutingModule } from './tab1-routing.module';

registerLocaleData(localePt);
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class Tab1PageModule {}

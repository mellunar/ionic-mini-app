import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { GamesSearchPage } from './pages/search/search.page';
import { GamesPage } from './pages/games/games.page';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { HeaderBackgroundComponent } from './components/header-background/header-background.component';
import { TagsComponent } from './components/tags/tags.component';
import { InvolvedCompaniesComponent } from './components/involved-companies/involved-companies.component';
import { GameTagsComponent } from './modals/game-tags/game-tags.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, GamesRoutingModule, CoreModule],
  declarations: [
    GamesPage,
    GamesSearchPage,
    GameDetailsPage,
    HeaderBackgroundComponent,
    TagsComponent,
    InvolvedCompaniesComponent,
    GameTagsComponent,
  ],
})
export class GamesModule {}

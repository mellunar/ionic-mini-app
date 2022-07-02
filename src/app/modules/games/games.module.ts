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
import { CategoriesModal } from './modals/categories-modal/categories-modal.component';
import { RatingComponent } from './components/rating/rating.component';
import { RatingsModal } from './modals/ratings-modal/ratings-modal.component';
import { CircularProgressComponent } from './components/circular-progress/circular-progress.component';
import { PlatformsModal } from './modals/platforms-modal/platforms-modal.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, GamesRoutingModule, CoreModule],
  declarations: [
    GamesPage,
    GamesSearchPage,
    GameDetailsPage,
    HeaderBackgroundComponent,
    TagsComponent,
    InvolvedCompaniesComponent,
    CategoriesModal,
    RatingComponent,
    RatingsModal,
    CircularProgressComponent,
    PlatformsModal,
  ],
})
export class GamesModule {}

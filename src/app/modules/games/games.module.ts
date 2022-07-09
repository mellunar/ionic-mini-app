import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { GamesSearchPage } from './pages/search/search.page';
import { GamesPage } from './pages/games/games.page';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { HeaderBackgroundComponent } from './components/header-background/header-background.component';
import { InvolvedCompaniesComponent } from './components/involved-companies/involved-companies.component';
import { CategoriesModal } from './modals/categories-modal/categories-modal.component';
import { RatingsModal } from './modals/ratings-modal/ratings-modal.component';
import { CircularProgressComponent } from './components/circular-progress/circular-progress.component';
import { PlatformsModal } from './modals/platforms-modal/platforms-modal.component';
import { ReleaseDatesModal } from './modals/release-dates-modal/release-dates-modal.component';
import { ScreenshotsModal } from './modals/screenshots-modal/screenshots-modal.component';
import { SwiperModule } from 'swiper/angular';
import { YoutubeModal } from './modals/youtube-modal/youtube-modal.component';
import { RelatedGamesModal } from './modals/related-games-modal/related-games-modal.component';
import { DetailsFooterComponent } from './components/details-footer/details-footer.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GamesRoutingModule,
    CoreModule,
    SwiperModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GamesPage,
    GamesSearchPage,
    GameDetailsPage,
    HeaderBackgroundComponent,
    InvolvedCompaniesComponent,
    CategoriesModal,
    RatingsModal,
    CircularProgressComponent,
    PlatformsModal,
    ReleaseDatesModal,
    ScreenshotsModal,
    YoutubeModal,
    RelatedGamesModal,
    DetailsFooterComponent,
  ],
})
export class GamesModule {}

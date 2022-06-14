import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { GamesSearchPage } from './pages/search/search.page';
import { GamesPage } from './pages/games/games.page';
import { GameDetailsPage } from './pages/game-details/game-details.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, GamesRoutingModule, CoreModule],
  declarations: [GamesPage, GamesSearchPage, GameDetailsPage],
})
export class GamesModule {}

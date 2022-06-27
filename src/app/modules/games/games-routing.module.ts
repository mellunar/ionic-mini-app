import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsPage } from './pages/game-details/game-details.page';
import { GamesPage } from './pages/games/games.page';
import { GamesSearchPage } from './pages/search/search.page';

const routes: Routes = [
  {
    path: '',
    component: GamesPage,
  },
  {
    path: 'search',
    component: GamesSearchPage,
  },
  {
    path: ':id',
    component: GameDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}

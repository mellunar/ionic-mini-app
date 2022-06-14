import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'games',
        loadChildren: () => import('../modules/games/games.module').then((m) => m.GamesModule),
      },
      {
        path: 'platforms',
        loadChildren: () => import('../modules/platforms/platforms.module').then((m) => m.PlatformsModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

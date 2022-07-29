import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformDetailsPage } from './pages/platform-details/platform-details.page';
import { PlatformsPage } from './pages/platforms/platforms.page';
import { SearchPage } from './pages/search/search.page';

const routes: Routes = [
  {
    path: '',
    component: PlatformsPage,
  },
  {
    path: 'search',
    component: SearchPage,
  },
  {
    path: ':id',
    component: PlatformDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformsRoutingModule {}

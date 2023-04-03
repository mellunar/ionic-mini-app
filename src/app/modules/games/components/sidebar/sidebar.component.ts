import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IgdbService } from 'src/app/core/services/igdb/igdb.service';
import { FilterOptions } from 'src/app/core/services/ui/ui.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories: FilterOptions[] = [];

  constructor(private menuController: MenuController, private igdbService: IgdbService, private router: Router) {}

  ngOnInit() {
    this.categories = this.igdbService.getCategoriesOptions();
  }

  close() {
    this.menuController.close();
  }

  searchCategory(category: FilterOptions) {
    this.router.navigate(['/games/search'], { queryParams: { [category.endpoint]: category.name } });
    this.close();
  }
}

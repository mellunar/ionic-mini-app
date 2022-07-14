import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IgdbService } from 'src/app/core/services/igdb/igdb.service';
import { FilterOptions } from 'src/app/core/services/ui/ui.interface';
import { SearchPreferences } from '../../state/search.store';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit, OnChanges {
  @Input() options: SearchPreferences;
  @Input() showFilter: boolean;

  @Output() close = new EventEmitter<any>();
  @Output() update = new EventEmitter<SearchPreferences>();

  unsavedOptions: SearchPreferences;

  categories: FilterOptions[];
  modes: FilterOptions[];
  perspectives: FilterOptions[];
  platforms: FilterOptions[];

  categoriesAlert = {
    header: 'Categories',
    cssClass: 'c-ion-alert',
  };

  platformsAlert = {
    header: 'Platforms',
    cssClass: 'c-ion-alert',
  };

  constructor(private igdbService: IgdbService) {}

  ngOnInit() {
    this.categories = this.igdbService.getCategoriesOptions();
    this.modes = this.igdbService.getModesOptions();
    this.perspectives = this.igdbService.getPerspectivesOptions();
    this.platforms = this.igdbService.getPlatformsOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showFilter?.currentValue) {
      this.unsavedOptions = this.options;
    }
  }

  closeFilter() {
    this.close.emit();
  }

  changeOption(key: string, values) {
    this.unsavedOptions = {
      ...this.unsavedOptions,
      [key]: values,
    };
  }

  changeCategory(exclude: boolean, values) {
    const { genres, themes } = values;

    if (exclude) {
      this.unsavedOptions = {
        ...this.unsavedOptions,
        ignore: { genres, themes },
      };
    } else {
      this.unsavedOptions = {
        ...this.unsavedOptions,
        genres,
        themes,
      };
    }
  }

  updatePreferences() {
    this.update.emit(this.unsavedOptions);
    this.closeFilter();
  }
}

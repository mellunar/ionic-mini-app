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

  parameters: FilterOptions[] = [
    { id: 'name', name: 'Name' },
    { id: 'keywords', name: 'Keyword' },
  ];

  sortingOrder: FilterOptions[] = [
    { id: 'asc', name: 'Ascending' },
    { id: 'desc', name: 'Descending' },
  ];

  sortingParameters: FilterOptions[] = [
    { id: 'none', name: 'None' },
    { id: 'name', name: 'Name' },
    { id: 'aggregated_rating', name: 'Media ratings' },
    { id: 'rating', name: 'User ratings' },
    { id: 'total_rating', name: 'Total ratings' },
    { id: 'hypes', name: 'Hypes' },
    { id: 'first_release_date', name: 'First release date' },
  ];

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

  changeOption(key: string, event, detail?: boolean) {
    this.unsavedOptions = {
      ...this.unsavedOptions,
      [key]: detail ? event.detail.value : event,
    };

    if (key === 'sortBy' && event === 'none') {
      this.changeOption('sortOrder', 'none');
    }

    if (key === 'sortBy' && event !== 'none') {
      this.changeOption('sortOrder', 'asc');
    }
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

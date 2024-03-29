import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, finalize, Observable, Subscription, switchMap, tap } from 'rxjs';
import { FilterOptions } from 'src/app/core/services/ui/ui.interface';
import { UIService } from 'src/app/core/services/ui/ui.service';
import { Game } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';
import { SearchPreferences, SearchStore } from '../../state/search.store';

@Component({
  selector: 'app-games-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class GamesSearchPage implements OnInit, OnDestroy {
  form = new FormGroup({
    search: new FormControl(''),
  });

  loading = false;
  results: Game[] = [];
  showFilter = false;
  searchPreferences: SearchPreferences;
  infiniteScrollDisabled = true;

  searchHistory$: Observable<FilterOptions[]>;
  searchSubscription$: Subscription;
  paramSubscription$: Subscription;

  paramSearch: string;

  constructor(
    private gamesService: GamesService,
    private uiService: UIService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchStore: SearchStore
  ) {}

  ngOnInit() {
    this.searchSubscriber();

    this.searchHistory$ = this.searchStore.history$;

    this.paramSubscription$ = this.activatedRoute.queryParams.subscribe((params) => {
      const keys = Object.keys(params);
      if (!params || keys.length === 0) {
        return;
      }

      if (this.paramSearch !== keys[0]) {
        this.paramSearch = keys[0];
        this.form.get('search').setValue(params[keys[0]]);
      }
    });
  }

  ngOnDestroy() {
    this.searchSubscription$.unsubscribe();
  }

  ionViewWillEnter() {
    this.uiService.setTitle('Search');
    this.searchPreferences = this.searchStore.getSearchPreferences();
  }

  ionViewWillLeave() {
    this.showFilter = false;
  }

  clearResults() {
    this.results = [];
    this.form.get('search').setValue('');
    this.uiService.setTitle('Search');
    this.infiniteScrollDisabled = true;

    if (this.paramSearch) {
      this.paramSearch = null;
      this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: {} });
    }
  }

  nextPage(e) {
    const { value } = this.form.get('search');

    if (!value || value === '') {
      return;
    }

    this.searchGames(value)
      .pipe(
        tap((res) => {
          this.results = this.results.concat(res);
          if (res.length === 0) {
            this.infiniteScrollDisabled = true;
          }
        }),
        finalize(() => {
          e.target.complete();
        })
      )
      .subscribe();
  }

  removeFromHistory(id) {
    this.searchStore.removeFromHistory(id);
  }

  searchFromHistory(term) {
    this.form.get('search').setValue(term);
  }

  searchSubscriber() {
    this.searchSubscription$ = this.form
      .get('search')
      .valueChanges.pipe(
        debounceTime(1000),
        filter((val) => !!val),
        tap(() => {
          this.loading = true;
        }),
        switchMap((val: string) => {
          if (!this.paramSearch) {
            this.searchStore.addToHistory(val);
          }

          return this.searchGames(val);
        }),
        tap((res) => {
          this.results = res;
          this.loading = false;

          if (res.length >= this.gamesService.searchItemsLimit && this.infiniteScrollDisabled) {
            this.infiniteScrollDisabled = false;
          }
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  toggleFilter(val: boolean) {
    this.showFilter = val;
  }

  updateSearchPreferences(preferences: SearchPreferences) {
    this.searchPreferences = preferences;
    this.searchStore.setSearchPreferences(preferences);

    const val = this.form.value.search;

    if (val !== '') {
      this.clearResults();
      this.form.get('search').setValue(val);
    }
  }

  private searchGames(val) {
    const offset = this.results.length + 1;

    if (this.paramSearch) {
      return this.gamesService.searchByTerm(val, this.paramSearch, offset, this.searchPreferences);
    } else {
      return this.gamesService.searchByTerm(val, 'name', offset, this.searchPreferences);
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, finalize, Subscription, switchMap, tap } from 'rxjs';
import { UIService } from 'src/app/core/services/ui/ui.service';
import { Game } from '../../state/games.interface';
import { GamesService } from '../../state/games.service';

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
  infiniteScrollDisabled = true;

  searchSubscription$: Subscription;
  paramSubscription$: Subscription;

  paramSearch: string;

  constructor(
    private gamesService: GamesService,
    private uiService: UIService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchSubscriber();

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
  }

  clearResults() {
    this.results = [];
    this.form.get('search').setValue('');
    this.uiService.setTitle('Search');
    this.infiniteScrollDisabled = true;
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
          return this.searchGames(val);
        }),
        tap((res) => {
          this.results = res;
          this.loading = false;

          if (res.length >= this.gamesService.searchItemsLimit && this.infiniteScrollDisabled) {
            this.infiniteScrollDisabled = false;
          }
        })
      )
      .subscribe();
  }

  private searchGames(val) {
    const offset = this.results.length + 1;

    if (this.paramSearch) {
      return this.gamesService.searchByTerm(val, this.paramSearch, offset);
    } else {
      return this.gamesService.searchByTerm(val, 'name', offset);
    }
  }
}

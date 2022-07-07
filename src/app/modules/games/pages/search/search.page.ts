import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, Subscription, switchMap, tap } from 'rxjs';
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

  searchSubscription$: Subscription;
  paramSubscription$: Subscription;

  constructor(private gamesService: GamesService, private uiService: UIService) {}

  ngOnInit() {
    this.searchSubscriber();
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
  }

  searchSubscriber() {
    this.searchSubscription$ = this.form
      .get('search')
      .valueChanges.pipe(
        tap((val) => {
          if (val) {
            this.loading = true;
          }
        }),
        debounceTime(1000),
        filter((val) => !!val),
        switchMap((val: string) => this.gamesService.searchGameByName(val)),
        tap((res) => {
          this.results = res;
          console.log(res);
          this.loading = false;
        })
      )
      .subscribe();
  }
}

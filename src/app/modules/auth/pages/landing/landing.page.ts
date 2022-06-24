import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAfter, format, addDays } from 'date-fns';
import { tap, catchError, Subscription } from 'rxjs';
import { IGDBToken } from 'src/app/core/services/igdb/igdb.interface';
import { IgdbService } from 'src/app/core/services/igdb/igdb.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { AuthStore } from '../../state/auth.store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, OnDestroy {
  private tokenSubscription$: Subscription;

  constructor(
    private toastService: ToastService,
    private igdbService: IgdbService,
    private authStore: AuthStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.tokenSubscription$ = this.authStore.token$.subscribe((token) => {
      this.tokenHandler(token);
    });
  }

  ngOnDestroy() {
    this.tokenSubscription$.unsubscribe();
  }

  private tokenHandler(token: IGDBToken) {
    if (token) {
      //this.router.navigate(['tabs/home']);
      console.log('token');
    }

    if (!token || isAfter(Date.now(), token?.expires_in)) {
      this.igdbService
        .getToken()
        .pipe(
          tap((res: IGDBToken) => {
            const data = res;
            data.expires_in = Number(format(addDays(Date.now(), 60), 'T'));
            this.authStore.updateToken(res);
            //this.router.navigate(['tabs/home']);
            console.log('token!');
          }),
          catchError((err) => {
            this.toastService.error(`${err.status} ${err.statusText}`);
            throw err;
          })
        )
        .subscribe();
    }
  }
}
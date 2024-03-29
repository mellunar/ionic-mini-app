import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAfter, format, addDays } from 'date-fns';
import { tap, catchError } from 'rxjs';
import { IGDBToken } from 'src/app/core/services/igdb/igdb.interface';
import { IgdbService } from 'src/app/core/services/igdb/igdb.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UIService } from 'src/app/core/services/ui/ui.service';
import { AuthStore } from '../../state/auth.store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  hasToken = false;

  constructor(
    private toastService: ToastService,
    private igdbService: IgdbService,
    private authStore: AuthStore,
    private router: Router,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.uiService.setTitle('Ionic Mini App | Mel Lunar');

    const token = this.authStore.token();

    if (token) {
      this.router.navigate(['/']);
    }

    if (!token || isAfter(Date.now(), token?.expires_in)) {
      this.igdbService
        .getToken()
        .pipe(
          tap((res: IGDBToken) => {
            const data = res;
            data.expires_in = Number(format(addDays(Date.now(), 59), 'T'));
            this.authStore.updateToken(res);

            this.hasToken = true;
            this.router.navigate(['/']);
          }),
          catchError((err) => {
            this.toastService.error(err.message);
            throw err;
          })
        )
        .subscribe();
    }
  }
}

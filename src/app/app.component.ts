import { Component } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { addDays, format, isAfter } from 'date-fns';
import { IgdbService } from './core/services/igdb/igdb.service';
import { IGDBToken } from './core/services/igdb/igdb.interface';
import { ToastService } from './core/services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private toastService: ToastService, private igdbService: IgdbService) {
    this.appInit();
  }

  appInit() {
    this.tokenHandler();
  }

  private tokenHandler() {
    let token: any = localStorage.getItem('app-token');

    if (token) {
      token = JSON.parse(token);
    }

    if (!token || isAfter(Date.now(), token?.expires_in)) {
      this.igdbService
        .getToken()
        .pipe(
          tap((res: IGDBToken) => {
            const data = res;
            data.expires_in = Number(format(addDays(Date.now(), 60), 'T'));
            localStorage.setItem('app-token', JSON.stringify(data));
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

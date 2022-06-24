import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthStore } from 'src/app/modules/auth/state/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public authStore: AuthStore) {}

  canActivate() {
    return this.hasToken();
  }

  hasToken() {
    return this.authStore.token$.pipe(
      map((token) => {
        if (!token) {
          this.router.navigate(['/landing']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStore } from 'src/app/modules/auth/state/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public authStore: AuthStore) {}

  canActivate(): boolean {
    return this.hasToken();
  }

  hasToken(): boolean {
    if (!this.authStore.token) {
      this.router.navigate(['/landing']);
      return false;
    }

    return true;
  }
}

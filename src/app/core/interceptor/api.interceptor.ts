import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { AuthStore } from 'src/app/modules/auth/state/auth.store';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject(AuthStore) private authStore: AuthStore) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.body === 'token') {
      return next.handle(request).pipe(
        timeout(20000),
        catchError((error) => {
          return this.errorHandler(error);
        })
      );
    }

    let token;
    const subscription = this.authStore.token$.subscribe((t) => {
      token = t;
    });

    let headers = request.headers;

    headers = headers.set('Authorization', `${token.token_type} ${token.access_token}`);

    const intercepted = request.clone({ headers });

    return next.handle(intercepted).pipe(
      timeout(20000),
      catchError((error) => {
        return this.errorHandler(error);
      }),
      finalize(() => {
        subscription.unsubscribe();
      })
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.status === 401) {
      this.authStore.resetToken();
    }

    if (error?.status === 0 && !window.navigator.onLine) {
      errorMessage = 'No internet connection';
    } else {
      errorMessage = `${error.status} ${error.statusText}`;
    }

    return throwError(() => ({ message: errorMessage, original: error }));
  }
}

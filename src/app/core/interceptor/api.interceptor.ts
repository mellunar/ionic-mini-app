import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { AuthStore } from 'src/app/modules/auth/state/auth.store';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req;

    if (request.body === 'token') {
      req = next.handle(request);
    } else {
      let token = this.authStore.token();

      if (!token) {
        window.location.href = './landing';
        return;
      }

      let headers = request.headers;

      headers = headers.set('Authorization', `${token.token_type} ${token.access_token}`);

      const intercepted = request.clone({ headers });

      req = next.handle(intercepted);
    }

    return req.pipe(
      timeout(20000),
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.status === 401) {
      this.authStore.resetToken();
      window.location.href = './landing';
    }

    if (error?.status === 0 && !window.navigator.onLine) {
      errorMessage = 'No internet connection';
    } else {
      errorMessage = `${error.status} ${error.statusText}`;
    }

    return throwError(() => ({ message: errorMessage, original: error }));
  }
}

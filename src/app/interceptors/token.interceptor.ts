import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      const authRequest = request.clone({
        headers: request.headers.set('token', accessToken)
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

}

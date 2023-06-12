import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from '@services/token.service';
import { UsersService } from '@services/users.service';
import { ResponseLogin } from '@models/auth.model';
import { RespLogin } from '@models/auth.model';
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private usersService: UsersService
  ) {}

  getDataUser() {
    return this.user$.getValue();
  }

  login(email: string, password: string) {
    return this.http
      .post<RespLogin>(`${this.apiUrl}/user/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  register(email: string, password: string, username: string) {
    return this.http.post(`${this.apiUrl}/user/join`, {
      email,
      password,
      username,
    });
  }

  registerAndLogin(email: string, password: string, username: string) {
    return this.register(email, password, username).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/user/is_available`,
      { email }
    );
  }

  reset(email: string) {
    return this.http.post(`${this.apiUrl}/user/reset`, { email });
  }

  changePassword(uid: string, resetCode: string, password: string) {
    const params = new HttpParams().set('uid', uid).set('resetCode', resetCode);
    return this.http.put(
      `${this.apiUrl}/user/reset`,
      { password },
      { params: params }
    );
  }

  getProfile() {
    return this.usersService.getMeProfile().pipe(
      tap((userResponse) => {
        this.user$.next(userResponse.user);
      })
    );
  }

  logout() {
    this.tokenService.removeToken();
  }
}

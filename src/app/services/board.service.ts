import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { TokenService } from '@services/token.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class MeService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getMeProfile() {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    let params = new HttpParams().set('email', this.getEmail());
    return this.http.get<User>(`${this.apiUrl}/user/info`, {
      headers: headers,
      params: params,
    });
  }

  getMeBoards() {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    return this.http.get<User>(`${this.apiUrl}/api/v1/me/boards`, {
      headers: headers,
    });
  }

  getEmail() {
    const token = this.tokenService.getToken();
    const decodeToken: any = jwt_decode(token);

    return decodeToken.email ? decodeToken.email : '';
  }
}

import { Injectable } from '@angular/core';
import { User, UserResponse } from '@models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getMeProfile() {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    let params = new HttpParams().set('email', this.getEmail());
    return this.http.get<UserResponse<User>>(`${this.apiUrl}/user/info`, {
      headers: headers,
      params: params,
    });
  }

  getEmail() {
    const token = this.tokenService.getToken();
    const decodeToken: any = jwt_decode(token);

    return decodeToken.email ? decodeToken.email : '';
  }

}



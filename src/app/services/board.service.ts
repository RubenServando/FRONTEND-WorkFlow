import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { Board } from '@models/board.model';
import { TokenService } from '@services/token.service';
import { ApiResponse } from '@models/apiResponse.model';

@Injectable({ providedIn: 'root' })
export class BoardService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addBoard(title: string, bg_type: string, background: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    let params = new HttpParams()
      .set('title', title)
      .set('bg_type', bg_type)
      .set('background', background);
    return this.http.post<ApiResponse<Board>>(`${this.apiUrl}/board/`, params, {
      headers: headers,
    });
  }

  getAllBoard() {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    return this.http.get<ApiResponse<[Board]>>(
      `${this.apiUrl}/board/`,
      {
        headers: headers,
      }
    );
  }

  deleteBoard(bid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/board/${bid}`, {
      headers: headers,
    });
  }
}

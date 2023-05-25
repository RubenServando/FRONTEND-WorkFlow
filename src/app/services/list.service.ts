import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Board } from '@models/board.model';
import { List } from '@models/list.model';
import { TokenService } from '@services/token.service';
import { ApiResponse } from '@models/apiResponse.model';

@Injectable({ providedIn: 'root' })
export class ListService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addList(title: string, position: number, bid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    let params = new HttpParams()
      .set('title', title)
      .set('position', position)
      .set('bid', bid);
    return this.http.post<ApiResponse<List>>(`${this.apiUrl}/list/`, params, {
      headers: headers,
    });
  }

  getAllList(bid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    return this.http.get<ApiResponse<[List]>>(`${this.apiUrl}/board/${bid}`, {
      headers: headers,
    });
  }
}

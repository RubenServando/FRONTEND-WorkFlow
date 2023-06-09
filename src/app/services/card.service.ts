import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@models/user.model';
import { Card } from '@models/card.model';
import { TokenService } from '@services/token.service';
import { ApiResponse } from '@models/apiResponse.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addCard(title: string, lid: string, position: number, description: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    let params = new HttpParams()
      .set('title', title)
      .set('lid', lid)
      .set('position', position)
      .set('description', description);
    return this.http.post<ApiResponse<Card>>(`${this.apiUrl}/card/`, params, {
      headers: headers,
    });
  }

  getCardsFromList(lid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    return this.http.get<ApiResponse<[Card]>>(`${this.apiUrl}/list/${lid}`, {
      headers: headers,
    });
  }

  deleteCard(cid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/card/${cid}`, {
      headers: headers,
    });
  }

  getDetail(cid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    return this.http.get<ApiResponse<Card>>(`${this.apiUrl}/card/${cid}`, {
      headers: headers,
    });
  }

  updateCard(title: string, description: string, cid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    let params = new HttpParams()
      .set('title', title)
      .set('description', description);
    return this.http.put<ApiResponse<Card>>(
      `${this.apiUrl}/card/${cid}`,
      params,
      {
        headers: headers,
      }
    );
  }
  
  updatePosCard(position: number, lid: string, cid: string) {
    let headers = new HttpHeaders().set('token', this.tokenService.getToken());
    let params = new HttpParams()
      .set('lid', lid)
      .set('position', position);
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/card/${cid}`, params, {
      headers: headers,
    });
  }
}

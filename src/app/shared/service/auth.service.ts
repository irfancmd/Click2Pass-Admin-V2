import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponseDto } from '../model/common-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private API_ENDPOINT = "http://localhost:3000/user";
  private API_ENDPOINT = "https://click2pass.ca:3000/user";

  public currentUser: any = null;

  constructor(private httpClient: HttpClient) { }

  authenticateUser(email: string, password: string): Observable<CommonResponseDto> {
    return this.httpClient.post<CommonResponseDto>(`${this.API_ENDPOINT}/login`, { email, password });
  }
}

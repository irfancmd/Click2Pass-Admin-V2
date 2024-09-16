import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponseDto } from '../model/common-response.model';
import { User } from '../model/user.model';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private API_ENDPOINT = "http://localhost:3000/user";
  private API_ENDPOINT = "https://click2pass.ca:3000/user";

  public currentUser?: User = null;

  constructor(private httpClient: HttpClient) { }

  authenticateUser(email: string, password: string, loginStep: number = 421): Observable<CommonResponseDto> {
    return this.httpClient.post<CommonResponseDto>(`${this.API_ENDPOINT}/login`, { email, password, loginStep });
  }

  authenticateUserOtp(email: string, password: string, otp: string): Observable<CommonResponseDto> {
    return this.httpClient.post<CommonResponseDto>(`${this.API_ENDPOINT}/login`, { email, password, loginStep: 2, otp });
  }

  getUsers(): Observable<CommonResponseDto> {
    return this.httpClient.get<CommonResponseDto>(`${this.API_ENDPOINT}`);
  }

  getUserById(userId: number): Observable<CommonResponseDto> {
    return this.httpClient.get<CommonResponseDto>(`${this.API_ENDPOINT}/${userId}`);
  }

  registerUser(userInfo: any): Observable<CommonResponseDto> {
    return this.httpClient.post<CommonResponseDto>(`${this.API_ENDPOINT}`, userInfo);
  }

  updateUser(userId: number, user: any): Observable<CommonResponseDto> {
    return this.httpClient.patch<CommonResponseDto>(
      `${this.API_ENDPOINT}/${userId}`,
      user
    );
  }

  removeUser(userId): Observable<CommonResponseDto> {
    return this.httpClient.delete<CommonResponseDto>(`${this.API_ENDPOINT}/${userId}`);
  }
}

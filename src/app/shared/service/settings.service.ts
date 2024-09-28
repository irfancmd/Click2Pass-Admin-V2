import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponseDto } from '../model/common-response.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // private API_ENDPOINT = "http://localhost:3000/settings";
  private API_ENDPOINT = "https://click2pass.ca:3000/settings";

  constructor(private httpClient: HttpClient) { }

  getSettings(): Observable<CommonResponseDto> {
    return this.httpClient.get<CommonResponseDto>(`${this.API_ENDPOINT}`);
  }

  updateSettings(settings: any): Observable<CommonResponseDto> {
    return this.httpClient.patch<CommonResponseDto>(
      `${this.API_ENDPOINT}`,
      settings
    );
  }
}

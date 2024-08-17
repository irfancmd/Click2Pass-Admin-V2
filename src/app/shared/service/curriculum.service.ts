import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  // private API_ENDPOINT = "http://localhost:3000/curriculum";
  private API_ENDPOINT = "https://click2pass.ca:3000/curriculum";

  constructor(private httpClient: HttpClient) { }

  getCurriculums() {
    return this.httpClient.get(`${this.API_ENDPOINT}`);
  }

  getById(id: number) {
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`);
  }

  createCurriculum(curriculum: any) {
    return this.httpClient.post(`${this.API_ENDPOINT}`, curriculum);
  }

  update(curriculumId, curriculum: any) {
    return this.httpClient.patch(
      `${this.API_ENDPOINT}/${curriculumId}`,
      curriculum
    );
  }

  remove(curriculumId) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${curriculumId}`);
  }
}

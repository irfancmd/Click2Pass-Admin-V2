import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  // private API_ENDPOINT = "http://localhost:3000/lesson";
  private API_ENDPOINT = "https://click2pass.ca:3000/lesson";

  constructor(private httpClient: HttpClient) { }

  getLessons() {
    return this.httpClient.get(`${this.API_ENDPOINT}`);
  }

  getById(id: number) {
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`);
  }

  createLesson(lesson: any) {
    return this.httpClient.post(`${this.API_ENDPOINT}`, lesson);
  }

  update(lessonId, lesson: any) {
    return this.httpClient.patch(`${this.API_ENDPOINT}/${lessonId}`, lesson);
  }

  remove(lessonId) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${lessonId}`);
  }
}

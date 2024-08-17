import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  // private API_ENDPOINT = "http://localhost:3000/chapter";
  private API_ENDPOINT = "https://click2pass.ca:3000/chapter";

  constructor(private httpClient: HttpClient) { }

  getChapters() {
    return this.httpClient.get(`${this.API_ENDPOINT}`);
  }

  getById(id: number) {
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`);
  }

  createChapter(chapter: any) {
    return this.httpClient.post(`${this.API_ENDPOINT}`, chapter);
  }

  updateChapter(chapterId, chapter: any) {
    return this.httpClient.patch(
      `${this.API_ENDPOINT}/${chapterId}`,
      chapter
    );
  }

  removeChapter(chapterId) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${chapterId}`);
  }
}

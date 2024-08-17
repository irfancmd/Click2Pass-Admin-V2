import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetService {
  // private API_ENDPOINT = "http://localhost:3000/question-set";
  private API_ENDPOINT = "https://click2pass.ca:3000/question-set";

  constructor(private httpClient: HttpClient) { }

  getQuestionSets() {
    return this.httpClient.get(this.API_ENDPOINT);
  }

  getQuestionSetById(questionSetId: number) {
    return this.httpClient.get(`${this.API_ENDPOINT}/${questionSetId}`);
  }

  createQuestionSets(questionSet: any) {
    return this.httpClient.post(this.API_ENDPOINT, questionSet);
  }

  update(questionSetId, question: any) {
    return this.httpClient.patch(
      `${this.API_ENDPOINT}/${questionSetId}`,
      question
    );
  }

  remove(questionSetId) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${questionSetId}`);
  }
}

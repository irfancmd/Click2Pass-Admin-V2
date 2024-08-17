import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  // private API_ENDPOINT = "http://localhost:3000/question";
  private API_ENDPOINT = "https://click2pass.ca:3000/question";

  constructor(private httpClient: HttpClient) { }

  getQuestions() {
    return this.httpClient.get(`${this.API_ENDPOINT}`);
  }

  getQuestionById(questionId: number) {
    return this.httpClient.get(`${this.API_ENDPOINT}/${questionId}`);
  }

  createQuestion(question: any) {
    return this.httpClient.post(`${this.API_ENDPOINT}`, question);
  }

  update(questionId, question: any) {
    return this.httpClient.patch(
      `${this.API_ENDPOINT}/${questionId}`,
      question
    );
  }

  remove(questionId) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${questionId}`);
  }
  
  uploadImages(questionId, formdata: FormData) {
    console.log(formdata);

    return this.httpClient.post(
      `${this.API_ENDPOINT}/upload-images/${questionId}`,
      formdata
    );
  }


}

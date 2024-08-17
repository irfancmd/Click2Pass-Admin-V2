import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionSetService } from 'src/app/shared/service/question-set.service';

@Component({
  selector: 'app-question-set-list',
  templateUrl: './question-set-list.component.html',
  styleUrls: ['./question-set-list.component.scss']
})
export class QuestionSetListComponent implements OnInit {
  public questionSets: any[] = [];

  constructor(
    private questionSetService: QuestionSetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.questionSetService.getQuestionSets().subscribe((data: any) => {
      if (data.data) {
        this.questionSets = data.data;
      }
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/question-set/form", id]);
  }

  onClickDelete(id: number) {
    this.questionSetService.remove(id).subscribe(() => {
      this.questionSets = this.questionSets.filter((e) => e.id != id);
    });
  }
}

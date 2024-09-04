import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CurriculumService } from 'src/app/shared/service/curriculum.service';
import { QuestionSetService } from 'src/app/shared/service/question-set.service';

@Component({
  selector: 'app-question-set-list',
  templateUrl: './question-set-list.component.html',
  styleUrls: ['./question-set-list.component.scss']
})
export class QuestionSetListComponent implements OnInit {
  public questionSets: any[] = [];
  public curriculumSelectItems: any[] = [];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
    curriculumId: new FormControl(
      window.localStorage.getItem("chsf-selectedCurriculumId") ?? "0"
    ),
  });

  constructor(
    private questionSetService: QuestionSetService,
    private curriculumService: CurriculumService,
    private router: Router,
    public authService: AuthService,
    public modalService: NgbModal,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.searchForm.controls.curriculumId.valueChanges.subscribe(
      (curriculumId) => {
        window.localStorage.setItem("chsf-selectedCurriculumId", curriculumId);
      }
    );

    this.curriculumService.getCurriculums().subscribe((data: any) => {
      if (data.data) {
        this.curriculumSelectItems = data.data.map((curriculum: any) => {
          return {
            value: curriculum.id,
            text: curriculum.name,
          };
        });
      }
    });

    this.onSearch();
  }

  onSearch() {
    this.questionSetService.getQuestionSets().subscribe((data: any) => {
      if (data.data) {
        let qSets = data.data;

        let curriculumId = this.searchForm.controls.curriculumId.value;

        if (curriculumId && curriculumId != "0") {
          qSets = qSets.filter(
            (e) => e.curriculumId == curriculumId
          );
        }

        this.questionSets = qSets;
      }
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/question-set/form", id]);
  }

  onDelete(id: number) {
    this.questionSetService.remove(id).subscribe(() => {
      this.questionSets = this.questionSets.filter((e) => e.id != id);

      this.toastrService.success("The operation completed successfully.", "Success");
    });
  }

  openPasswordModal(content: any, id: any) {
    this.modalService
      .open(content, { size: 'md' })
      .result.then(
        (result) => {
          if (id && result && result.length > 0 && this.authService.currentUser) {
            this.authService.authenticateUser(this.authService.currentUser.email, result).subscribe((res: any) => {
              if (res.status === 0) {
                this.onDelete(id);
              } else {
                this.toastrService.error("Invalid Password", "Error");
              }
            });
          } else {
            this.toastrService.error("Invalid Password", "Error");
          }
        },
        () => { }
      );
  }

}

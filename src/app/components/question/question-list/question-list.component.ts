import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/service/auth.service";
import { ChapterService } from "src/app/shared/service/chapter.service";
import { CurriculumService } from "src/app/shared/service/curriculum.service";
import { QuestionService } from "src/app/shared/service/question.service";

@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"],
})
export class QuestionListComponent implements OnInit {
  public IMG_ROOT = "https://click2pass.ca/uploads/";

  public questions: any[] = [];
  public chapterSelectItems: any[] = [];
  public chapterSelectItemsViewable: any[] = [];
  public curriculumSelectItems: any[] = [];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
    chapterId: new FormControl(
      window.localStorage.getItem("qsf-selectedChapterId") ?? "0"
    ),
    curriculumId: new FormControl(
      window.localStorage.getItem("qsf-selectedCurriculumId") ?? "0"
    ),
  });

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private chapterService: ChapterService,
    private curriculumService: CurriculumService,
    public authService: AuthService,
    public modalService: NgbModal,
    public toastrService: ToastrService
  ) {}

  ngOnInit(): void {
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

    this.chapterService.getChapters().subscribe((data: any) => {
      if (data.data) {
        this.chapterSelectItems = data.data.map((category: any) => {
          return {
            value: category.id,
            text: category.name,
            curriculumId: category.curriculumId,
          };
        });

        let curriculumId = this.searchForm.controls.curriculumId.value;

        if (curriculumId != "0") {
          this.chapterSelectItemsViewable = this.chapterSelectItems.filter(
            (categorySelectItem) =>
              categorySelectItem.curriculumId == curriculumId
          );
        } else {
          this.chapterSelectItemsViewable = this.chapterSelectItems;
        }
      }
    });

    this.searchForm.controls.curriculumId.valueChanges.subscribe(
      (curriculumId) => {
        this.chapterSelectItemsViewable = this.chapterSelectItems.filter(
          (categorySelectItem) =>
            categorySelectItem.curriculumId == curriculumId
        );
        window.localStorage.setItem("qsf-selectedCurriculumId", curriculumId);
      }
    );

    this.searchForm.controls.chapterId.valueChanges.subscribe((chapterId) => {
      window.localStorage.setItem("qsf-selectedChapterId", chapterId);
    });

    this.onSearch();
  }

  onSearch() {
    this.questionService.getQuestions().subscribe((data: any) => {
      let questionList = data.data;

      let searchText = this.searchForm.controls.searchText.value;
      let curriculumId = this.searchForm.controls.curriculumId.value;
      let chapterId = this.searchForm.controls.chapterId.value;

      if (searchText) {
        questionList = questionList.filter((e) =>
          e.questionText.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (curriculumId && curriculumId != "0") {
        questionList = questionList.filter(
          (e) => e.curriculumId == curriculumId
        );
      }

      if (chapterId && chapterId != "0") {
        questionList = questionList.filter((e) => e.chapterId == chapterId);
      }

      this.questions = questionList;
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/question/form", id]);
  }

  onDelete(id: number) {
    this.questionService.remove(id).subscribe(() => {
      this.questions = this.questions.filter((e) => e.id != id);
    });
  }

  getQuestionType(question: any) {
    if (question) {
      switch (question.questionType) {
        case 0:
          return "Written";
        case 1:
          return "Multiple Choice";
        default:
          return "Unknown";
      }
    }

    return "Unknown";
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

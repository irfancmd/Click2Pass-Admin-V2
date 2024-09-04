import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/service/auth.service";
import { ChapterService } from "src/app/shared/service/chapter.service";
import { CurriculumService } from "src/app/shared/service/curriculum.service";

@Component({
  selector: "app-chapter-list",
  templateUrl: "./chapter-list.component.html",
  styleUrls: ["./chapter-list.component.scss"],
})
export class ChapterListComponent implements OnInit {
  categories: any[];
  public curriculumSelectItems: any[] = [];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
    curriculumId: new FormControl(
      window.localStorage.getItem("chsf-selectedCurriculumId") ?? "0"
    ),
  });

  constructor(
    private router: Router,
    private chapterService: ChapterService,
    private curriculumService: CurriculumService,
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
    this.chapterService.getChapters().subscribe((data: any) => {
      let categoryList = data.data;

      let searchText = this.searchForm.controls.searchText.value;
      let curriculumId = this.searchForm.controls.curriculumId.value;

      if (searchText) {
        categoryList = categoryList.filter((e) =>
          e.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (curriculumId && curriculumId != "0") {
        categoryList = categoryList.filter(
          (e) => e.curriculum.id == curriculumId
        );
      }

      this.categories = categoryList;
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/chapter/form", id]);
  }

  onDelete(id: number) {
    this.chapterService.removeChapter(id).subscribe(() => {
      this.categories = this.categories.filter((e) => e.id != id);

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

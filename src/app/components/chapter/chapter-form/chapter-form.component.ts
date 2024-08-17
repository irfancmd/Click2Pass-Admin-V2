import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from 'src/app/shared/service/chapter.service';
import { CurriculumService } from 'src/app/shared/service/curriculum.service';

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.scss']
})
export class ChapterFormComponent implements OnInit {
  public categoryForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    curriculumId: new FormControl(window.localStorage.getItem("chf-selectedCurriculumId") ?? "1"),
  });

  public curriculumSelectItems: any[] = [];

  public chapterToBeUpdated: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chapterService: ChapterService,
    private curriculumService: CurriculumService
  ) { }

  ngOnInit(): void {
    const chapterId = this.activatedRoute.snapshot.params["id"];

    this.curriculumService.getCurriculums().subscribe((data: any) => {
      if (data.data) {
        this.curriculumSelectItems = data.data.map((curriculum: any) => {
          return {
            value: curriculum.id,
            text: curriculum.name,
          };
        });

        if (chapterId) {
          this.chapterService.getById(chapterId).subscribe((data: any) => {
            this.chapterToBeUpdated = data.data;

            this.categoryForm.patchValue({
              name: this.chapterToBeUpdated.name ?? null,
              description: this.chapterToBeUpdated.description ?? null,
              curriculumId: this.chapterToBeUpdated.curriculumId ?? "0",
            });
          });
        }
      }
    });

    this.categoryForm.controls.curriculumId.valueChanges.subscribe(curriculumId => {
      window.localStorage.setItem("chf-selectedCurriculumId", curriculumId);
    });
  }

  onSubmit() {
    if (
      this.categoryForm.controls.name.value &&
      this.categoryForm.controls.curriculumId.value != "0"
    ) {
      if (!this.chapterToBeUpdated) {
        // Create
        this.chapterService
          .createChapter(this.categoryForm.value)
          .subscribe(() => {
            this.router.navigate(["/chapter"]);
          });
      } else {
        // Update
        this.chapterService
          .updateChapter(this.chapterToBeUpdated.id, this.categoryForm.value)
          .subscribe(() => {
            this.router.navigate(["/chapter"]);
          });
      }
    }
  }
}

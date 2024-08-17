import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurriculumService } from 'src/app/shared/service/curriculum.service';

@Component({
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss']
})
export class CurriculumFormComponent implements OnInit {
  public curriculumForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  });

  public curriculumToBeUpdated: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private curriculumService: CurriculumService
  ) { }

  ngOnInit(): void {
    const curriculumId = this.activatedRoute.snapshot.params["id"];

    if (curriculumId) {
      this.curriculumService.getById(curriculumId).subscribe((data: any) => {
        this.curriculumToBeUpdated = data.data;

        this.curriculumForm.patchValue({
          name: this.curriculumToBeUpdated.name ?? null,
          description: this.curriculumToBeUpdated.description ?? null,
        });
      });
    }
  }

  onSubmit() {
    if (this.curriculumForm.controls.name.value) {
      if (!this.curriculumToBeUpdated) {
        // Create
        this.curriculumService
          .createCurriculum(this.curriculumForm.value)
          .subscribe(() => {
            this.router.navigate(["/curriculum"]);
          });
      } else {
        // Update
        this.curriculumService
          .update(this.curriculumToBeUpdated.id, this.curriculumForm.value)
          .subscribe(() => {
            this.router.navigate(["/curriculum"]);
          });
      }
    }
  }
}

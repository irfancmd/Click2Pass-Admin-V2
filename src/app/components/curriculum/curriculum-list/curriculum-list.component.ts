import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CurriculumService } from 'src/app/shared/service/curriculum.service';

@Component({
  selector: 'app-curriculum-list',
  templateUrl: './curriculum-list.component.html',
  styleUrls: ['./curriculum-list.component.scss']
})
export class CurriculumListComponent implements OnInit {
  curriculums: any[];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
  });

  constructor(
    private curriculumService: CurriculumService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.curriculumService.getCurriculums().subscribe((data: any) => {
      this.curriculums = data.data;
    });

    this.searchForm.valueChanges.subscribe((controlValues) => {
      if (controlValues.searchText) {
        this.curriculumService.getCurriculums().subscribe((data: any) => {
          this.curriculums = data.data.filter((e) =>
            e.name
              .toLowerCase()
              .includes(controlValues.searchText.toLowerCase())
          );
        });
      } else {
        this.curriculumService.getCurriculums().subscribe((data: any) => {
          this.curriculums = data.data;
        });
      }
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/curriculum/form", id]);
  }

  onDelete(id: number) {
    return () => {
      this.curriculumService.remove(id).subscribe(() => {
        this.curriculums = this.curriculums.filter((e) => e.id != id);
      });
    };
  }

  onClickDelete(id: number) {
    this.onDelete(id);
    // this.dialogService.open(DeleteModalComponent, {
    //   context: {
    //     onDeleteFunction: this.onDelete(id),
    //   },
    // });
  }
}

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/service/auth.service";
import { CurriculumService } from "src/app/shared/service/curriculum.service";

@Component({
  selector: "app-curriculum-list",
  templateUrl: "./curriculum-list.component.html",
  styleUrls: ["./curriculum-list.component.scss"],
})
export class CurriculumListComponent implements OnInit {
  curriculums: any[];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
  });

  constructor(
    private curriculumService: CurriculumService,
    private router: Router,
    public authService: AuthService,
    public modalService: NgbModal,
    public toastrService: ToastrService
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
    this.curriculumService.remove(id).subscribe(() => {
      this.curriculums = this.curriculums.filter((e) => e.id != id);

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

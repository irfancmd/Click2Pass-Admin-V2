import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public accountForm: UntypedFormGroup;
  public active = 1;

  public userToBeUpdated: any = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createAccountForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      // email: [null, [Validators.required]],
      password: [null],
      confirmPassword: [null],
      createCurriculum: [0],
      readCurriculum: [0],
      createChapter: [0],
      readChapter: [0],
      createQuestion: [0],
      readQuestion: [0],
      createQuestionSet: [0],
      readQuestionSet: [0],
      createUser: [0],
      readUser: [0],
      loginOtpRequired: [0],
    })
  }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.params["id"];

    if (userId) {
      this.authService.getUserById(userId).subscribe((res: any) => {
        if (res.status === 0 && res.data) {
          this.userToBeUpdated = res.data;

          this.accountForm.controls.name.setValue(this.userToBeUpdated?.name ?? null);
          // this.accountForm.controls.email.setValue(this.userToBeUpdated?.email ?? null);
          this.accountForm.controls.createCurriculum.setValue(this.userToBeUpdated?.createCurriculum ?? 0);
          this.accountForm.controls.readCurriculum.setValue(this.userToBeUpdated?.readCurriculum ?? 0);
          this.accountForm.controls.createChapter.setValue(this.userToBeUpdated?.createChapter ?? 0);
          this.accountForm.controls.readChapter.setValue(this.userToBeUpdated?.readChapter ?? 0);
          this.accountForm.controls.createQuestion.setValue(this.userToBeUpdated?.createQuestion ?? 0);
          this.accountForm.controls.readQuestion.setValue(this.userToBeUpdated?.readQuestion ?? 0);
          this.accountForm.controls.createQuestionSet.setValue(this.userToBeUpdated?.createQuestionSet ?? 0);
          this.accountForm.controls.readQuestionSet.setValue(this.userToBeUpdated?.readQuestionSet ?? 0);
          this.accountForm.controls.createUser.setValue(this.userToBeUpdated?.createUser ?? 0);
          this.accountForm.controls.readUser.setValue(this.userToBeUpdated?.readUser ?? 0);
          this.accountForm.controls.loginOtpRequired.setValue(this.userToBeUpdated?.loginOtpRequired ?? 0);
        }
      });
    }
  }

  validateForm(): boolean {
    if (this.accountForm.controls.password.value && this.accountForm.controls.confirmPassword.value) {
      if (this.accountForm.controls.password.value === this.accountForm.controls.confirmPassword.value) {
        return true;
      } else {
        this.toastr.error("Passwords don't match.", "Error");

        return false;
      }
    }

    return true;
  }

  onSubmit() {
    if(this.validateForm()) {
    this.authService.updateUser(this.userToBeUpdated.id, this.accountForm.value).subscribe(res => {
      if (res.status === 0) {
        this.router.navigate(["/users/list-user"]);
      } else {
        this.toastr.error(res.message, "Error");
      }
    });
    }
  }
}

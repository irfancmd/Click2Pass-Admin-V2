import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: UntypedFormGroup;
  public permissionForm: UntypedFormGroup;
  public active = 1;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.createAccountForm();
    // this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      createCurriculum: [0],
      readCurriculum: [0],
      createChapter: [0],
      readChapter: [0],
      createQuestion: [0],
      readQuestion: [0],
      createQuestionSet: [0],
      readQuestionSet: [0],
      createUser: [0],
      readUser: [0]
    })
  }

  // createPermissionForm() {
  //   this.permissionForm = this.formBuilder.group({
  //   })
  // }

  ngOnInit() {
  }

  validateForm(): boolean {
    if(this.accountForm.controls.password.value && this.accountForm.controls.confirmPassword.value) {
      if(this.accountForm.controls.password.value === this.accountForm.controls.confirmPassword.value) {
        return true;
      } else {
        this.toastr.error("Passwords don't match.", "Error");

        return false;
      }
    }

    this.toastr.error("Please fill the form properly.", "Error");

    return false;
  }

  onSubmit() {
    if(this.validateForm()) {
      this.authService.registerUser(this.accountForm.value).subscribe(res => {
        if(res.status === 0) {
          this.router.navigate(["/users/list-user"]);
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
    }
  }
}

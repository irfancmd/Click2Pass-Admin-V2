import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public emailForm: UntypedFormGroup;
  public passwordResetForm: UntypedFormGroup;

  public isOtpFormVisible: boolean = false;

  public otpAwaitingEmail: string;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.createEmailForm();
    this.createPasswordResetForm();
  }

  ngOnInit(): void {}
  
  createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: [null, [Validators.required]],
    });
  }

  createPasswordResetForm() {
    this.passwordResetForm = this.formBuilder.group({
      otp: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  onSubmitEmail() {
    this.otpAwaitingEmail = this.emailForm.controls.email.value;

    if(this.otpAwaitingEmail) {
      this.authService.restPasswordStep1(this.otpAwaitingEmail).subscribe(res => {
        if(res && res.status == 2) {
          this.toastr.success(res.message, "Success");

          this.isOtpFormVisible = true;
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
    }
  }

  onSubmit() {
    const otp = this.passwordResetForm.controls.otp.value;
    const password = this.passwordResetForm.controls.password.value;
    const confirmPassword = this.passwordResetForm.controls.confirmPassword.value;

    if(!password || !confirmPassword) {
      this.toastr.error("You must fill up necessary fields", "Error");
      return;
    }

    if(password != confirmPassword) {
      this.toastr.error("Passwords don't match", "Error");
      return;
    }

    if(this.otpAwaitingEmail && otp) {
      this.authService.restPasswordStep2(this.otpAwaitingEmail, password, otp).subscribe(res => {
        if(res && res.status == 0) {
          this.toastr.success(res.message, "Success");

          this.router.navigate(["/", "login"])
        } else {
          this.toastr.success(res.message, "Error");
        }
      });
    }
  }
}

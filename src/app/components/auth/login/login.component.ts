import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NavService } from 'src/app/shared/service/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  public otpForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public active = 1;
  public isOtpFormVisible: boolean = false;

  public otpAwaitingEmail: string;
  public otpAwaitingPassword: string;

  owlcarousel = [
    {
      title: "Welcome to Click2Pass Admin",
      desc: "Use this admin panel to control what happens in the Click2Pass front-end site.",
    },
    // {
    //   title: "Welcome to Click2Pass Admin",
    //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    // },
    // {
    //   title: "Welcome to Click2pass Admin",
    //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    // }
  ]

  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: false
  };

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService, private navService: NavService) {
    this.createLoginForm();
    this.createOtpForm();
    // this.createRegisterForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  createOtpForm() {
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
    })
  }

  // createRegisterForm() {
  //   this.registerForm = this.formBuilder.group({
  //     email: [''],
  //     password: [''],
  //     confirmPassword: [''],
  //   })
  // }


  ngOnInit() {
  }

  onSubmit() {
    this.otpAwaitingEmail = this.loginForm.controls.email.value;
    this.otpAwaitingPassword = this.loginForm.controls.password.value;

    // Login
    this.authService.authenticateUser(this.loginForm.controls.email.value, this.loginForm.controls.password.value, 1)
      .subscribe(res => {
        if (res.status === 0) {
          // Success
          this.authService.currentUser = res.data;
          this.navService.populateRoleWiseMenus();

          this.router.navigate(["/dashboard/default"]);
        } else if (res.status === 2) {
          // Need OTP
          this.isOtpFormVisible = true;
          this.toastr.info(res.message, "Otp Required");
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
  }

  onSubmitOTP() {
    // Login
    this.authService.authenticateUserOtp(this.loginForm.controls.email.value, this.loginForm.controls.password.value, this.otpForm.controls.otp.value)
      .subscribe(res => {
        if (res.status === 0) {
          // Success
          this.authService.currentUser = res.data;
          this.navService.populateRoleWiseMenus();

          this.router.navigate(["/dashboard/default"]);
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
  }

}

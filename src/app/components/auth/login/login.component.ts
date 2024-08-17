import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public active = 1;

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

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.createLoginForm();
    // this.createRegisterForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
    // Login
    this.authService.authenticateUser(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe(res => {
        if (res.status === 0) {
          // Success
          this.authService.currentUser = res.data;
          
          this.router.navigate(["/dashboard/default"]);
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
  }

}

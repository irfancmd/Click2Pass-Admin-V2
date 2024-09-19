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
  public passwordResetForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.createPasswordResetForm();
  }

  ngOnInit(): void {
      
  }

  createPasswordResetForm() {
    this.passwordResetForm = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  onSubmit() {
    
  }
}

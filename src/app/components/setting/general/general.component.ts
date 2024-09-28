import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { SettingsService } from 'src/app/shared/service/settings.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public settingsForm = new FormGroup({
    emailPassword: new FormControl(null),
  });

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    public modalService: NgbModal,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(value => {
      this.settingsForm.patchValue(value.data);
    });
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settingsForm.value).subscribe(res => {
      if (res && res.status == 0) {
        this.toastrService.success("Settings Updated Successfully", "Error");
      } else {
        this.toastrService.error("Couldn't Update Settings", "Error");
      }
    });
  }

  openPasswordModal(content: any) {
    this.modalService
      .open(content, { size: 'md', backdrop: false })
      .result.then(
        (result) => {
          if (result && result.length > 0 && this.authService.currentUser) {
            this.authService.authenticateUser(this.authService.currentUser.email, result).subscribe((res: any) => {
              if (res.status === 0) {
                this.onSubmit();
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

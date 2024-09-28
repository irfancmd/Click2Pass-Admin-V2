import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TableService } from 'src/app/shared/service/table.service';
import { UserListDB, USERLISTDB } from 'src/app/shared/tables/list-users';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListUserComponent implements OnInit {
  public user_list = []

  // public tableItem$: Observable<UserListDB[]>;
  // public searchText;
  // total$: Observable<number>;

  // Dependency: public service: TableService, 
  constructor(public authService: AuthService,
    public modalService: NgbModal,
    public toastrService: ToastrService,
    public router: Router

  ) {
    // this.tableItem$ = service.tableItem$;
    // this.total$ = service.total$;
    // this.service.setUserData(USERLISTDB)
  }

  // @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  // onSort({ column, direction }: SortEvent) {
  //   // resetting other headers
  //   this.headers.forEach((header) => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

  //   this.service.sortColumn = column;
  //   this.service.sortDirection = direction;
  // }

  ngOnInit() {
    this.authService.getUsers().subscribe(res => {
      if (res.data) {
        this.user_list = res.data;

        this.user_list = this.user_list.filter(u => u.email != "guest@email.com");

        if (this.authService.currentUser && this.authService.currentUser.email != "su@email.com") {
          this.user_list = this.user_list.filter(u => u.email != "su@email.com");
        }
      }
    })
  }

  onDelete(id: number) {
    this.authService.removeUser(id).subscribe((res) => {
      if (res.status == 0) {
        this.user_list = this.user_list.filter((e) => e.id != id);
      }
    });
  }

  openPasswordModal(content: any, id: any = 0, create: boolean = false) {
    this.modalService
      .open(content, { size: 'md' })
      .result.then(
        (result) => {
          if (result && result.length > 0 && this.authService.currentUser) {
            this.authService.authenticateUser(this.authService.currentUser.email, result).subscribe((res: any) => {
              if (res.status === 0) {
                if(!create) {
                  this.onDelete(id);
                } else {
                  // Navigate to user form
                  this.router.navigate(["users", "create-user"]);
                }
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


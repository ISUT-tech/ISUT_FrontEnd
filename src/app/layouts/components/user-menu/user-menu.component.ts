import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { MatDialog } from '@angular/material';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'portal-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  user: any;
  dialogRef: any;
  constructor(
    public _loginService: LoginService,
    private _matDialog: MatDialog,
    public _utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  // changePassword(): void {
  //   this.dialogRef = this._matDialog.open(ChangePasswordComponent, {
  //     panelClass: 'contact-form-dialig',
  //     width: '600px'
  //   });
  //   this.dialogRef.afterClosed().subscribe((response: any) => {
  //     if (!response) {
  //       return;
  //     }
  //   });
  // }
}

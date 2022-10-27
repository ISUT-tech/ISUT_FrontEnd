import { UsersService } from './../users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UtilityService } from '../../../shared/services/utility.service';
import { AddCouponComponent } from '../../coupons/add-coupon/add-coupon.component';
import { CouponsService } from '../../coupons/coupons.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  AddUsers: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<AddUsersComponent>,
    public _usersService: UsersService,
    public _utilityService : UtilityService
  ) {}

  ngOnInit() {
    this.AddUsers = this._usersService.formGroup;
  }
  sumit() {
    const data = this.AddUsers.getRawValue();
    this._usersService.addUser(data).then((response: any) => {
      this.AddUsers.reset();
      this.matDialogRef.close(response);
      this._utilityService.openMatSnackBar(response.message, response.status);
    });
  }
}
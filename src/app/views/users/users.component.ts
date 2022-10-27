import { AddUsersComponent } from './add-users/add-users.component';
import { UserService } from './../user/user-service.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConstantService } from '../../shared/services/constants.service';
import { UtilityService } from '../../shared/services/utility.service';
import { AddCouponComponent } from '../coupons/add-coupon/add-coupon.component';
import { CouponsService } from '../coupons/coupons.service';
import { UsersService } from './users.service';

@Component({
    selector       : 'users',
    templateUrl    : './users.component.html',
    styleUrls: ["./users.component.scss"],

})
export class UsersComponent{
displayedColumns: string[] = [];
dataSource: any;
pagination: any;
filter: any;
pageNumber: any = 1;
filterInput: string = null;

constructor(
  public dialog: MatDialog,
  public _utilityService: UtilityService,
  private _usersService: UsersService,
  public _constantService: ConstantService
) {}

ngOnInit() {
  this.pagination = this._utilityService.pagination;
  this.displayedColumns = this._usersService.displayedColumns;
  this.getDataList();
}
setStatus(id, event) {
  console.log(">> inside toogle", event);

  this._usersService.statusUser(id, event.checked).then((response: any) => {
    this._utilityService.openMatSnackBar(response.message, response.status);
    console.log(">>> Response is ", response);
  });
}
getNextPageData(page: any) {
  this.pagination.currentPage = page.pageIndex + 1;
  this.pagination.perPage = page.pageSize;
  this.getDataList();
}
addCoupon() {
  const dialogRef = this.dialog.open(AddUsersComponent, {
    width: "40%",
  });
  dialogRef.afterClosed().subscribe((response) => {
    if (!response) {
      return;
    }
    this.getDataList();
  });
}
deleteById(id: any) {
  if (confirm("Are you sure you want to delete this User?")) {
    this._usersService.deleteById(id).then(
      (response: any) => {
        if (response && response.status == "OK") {
          this.ngOnInit();
          this._utilityService.openMatSnackBar(
            response.message,
            response.status
          );
        } else {
          this._utilityService.openMatSnackBar(
            response.message,
            response.status
          );
        }
      },
      (error) => {
        this._utilityService.openMatSnackBar(
          "Internal Server error",
          "ERROR"
        );
      }
    );
  }
}
// view(id) {
//   let data = {};
//   this._usersService.getUserDetail(id).then((response: any) => {
//     data["userDetail"] = response.data;
//     this._usersService.getBookingList(id).then((response1: any) => {
//       data["bookingDetail"] = response1.data;
//       const dialogRef = this.dialog.open(AddUsersComponent, {
//         width: "850px",
//         data: data,
//         disableClose: true,
//       });
//     });
//   });
// }


getDataList() {
  let json = {
    filter: {
      keyword: this.filterInput,
      role: 1

    },
    pagination: this.pagination,

  };
  this._usersService.getData(json).then((response: any) => {
    if (response && response.status === "OK") {
      this.pagination = response.data;
      this.dataSource = this.pagination.data;
      console.log(">>>>>>>", this.dataSource);
    }
  });
}
}

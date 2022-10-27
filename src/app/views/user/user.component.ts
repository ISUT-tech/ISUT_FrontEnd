import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConstantService } from "../../shared/services/constants.service";
import { DashboardService } from "../../shared/services/dashboard.service";
import { UtilityService } from "../../shared/services/utility.service";
import { DetailsComponent } from "../user/details/details.component";
import { UserService } from "./user-service.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  dataSource: any;
  pagination: any;
  filter: any;
  pageNumber: any = 1;
  filterInput: string = null;
  displayedColumns: string[] = [];

  constructor(
    public dialog: MatDialog,
    public _utilityService: UtilityService,
    private _userService: UserService,
    public _constantService: ConstantService
  ) {}

  ngOnInit() {
    this.pagination = this._utilityService.pagination;
    this.displayedColumns = this._userService.displayedColumns;
    this.getDataList();
  }
  setStatus(id, event) {
    console.log(">> inside toogle", event);

    this._userService.statusUser(id, event.checked).then((response: any) => {
      this._utilityService.openMatSnackBar(response.message, response.status);
      console.log(">>> Response is ", response);
    });
  }

  view(id) {
    let data = {};
    this._userService.getUserDetail(id).then((response: any) => {
      data["userDetail"] = response.data;
      this._userService.getBookingList(id).then((response1: any) => {
        data["bookingDetail"] = response1.data;
        const dialogRef = this.dialog.open(DetailsComponent, {
          width: "850px",
          data: data,
          disableClose: true,
        });
      });
    });
  }
  getNextPageData(page: any) {
    this.pagination.currentPage = page.pageIndex + 1;
    this.pagination.perPage = page.pageSize;
    this.getDataList();
  }

  deleteById(id: any) {
    if (confirm("Are you sure you want to delete this User?")) {
      this._userService.deleteById(id).then(
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
  getDataList() {
    let json = {
      pagination: this.pagination,
      filter: {
        keyword: this.filterInput,
        role: 2,
      },
    };
    this._userService.getData(json).then((response: any) => {
      if (response && response.status === "OK") {
        this.pagination = response.data;
        this.dataSource = this.pagination.data;
      }
    });
  }
}

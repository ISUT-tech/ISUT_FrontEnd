import { UtilityService } from "./../../shared/services/utility.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DashboardService } from "../../shared/services/dashboard.service";
import { DetailsComponent } from "./../driver/details/details.component";
import { DriverService } from "./driver.service";
import { ConstantService } from "../../shared/services/constants.service";
import { BookingDetailsComponent } from "./booking-details/booking-details.component";
import { TipHistoryComponent } from "./tip-history/tip-history.component";
import { FeedbackComponent } from "./feedback/feedback.component";

@Component({
  selector: "app-result",
  templateUrl: "./driver.component.html",
  styleUrls: ["./driver.component.css"],
})
export class DriverComponent implements OnInit {
  dataSource: any;
  pagination: any;
  filter: any;
  pageNumber: any = 1;
  filterInput: string = null;
  displayedColumns: string[] = [];

  constructor(
    private dialog: MatDialog,
    public _utilityService: UtilityService,
    private _driverService: DriverService,
    public _constantService: ConstantService
  ) {}

  ngOnInit() {
    this.pagination = this._utilityService.pagination;
    this.displayedColumns = this._driverService.displayedColumns;
    this.getDataList();
  }
  getNextPageData(page: any) {
    this.pagination.currentPage = page.pageIndex + 1;
    this.pagination.perPage = page.pageSize;
    this.getDataList();
  }
  view(id: any): void {
    let driverData = {};
    this._driverService.driverRating(id).then((response1: any) => {
      driverData["driverRating"] = response1.data;
      this._driverService.getUserDetail(id).then((response: any) => {
        driverData["driverDetail"] = response.data;
        const dialogRef = this.dialog.open(DetailsComponent, {
          width: "900px",
          height: "530px",
          data: driverData,
          disableClose: true,
        });
      });
    });
  }

  deleteById(id: any) {
    if (confirm("Are you sure you want to delete?")) {
      this._driverService.deleteById(id).then(
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
        role: 3,
      },
    };
    this._driverService.getData(json).then((response: any) => {
      if (response && response.status === "OK") {
        this.pagination = response.data;
        this.dataSource = this.pagination.data;
      }
    });
  }

  setStatus(id, event) {
    console.log(">> inside toogle", event);

    this._driverService.statusUser(id, event.checked).then((response: any) => {
      this._utilityService.openMatSnackBar(response.message, response.status);
      console.log(">>> Response is ", response);
    });
  }
  bookingDetails(id) {
    this._driverService.getBookingList(id).then((response: any) => {
      const dialogRef = this.dialog.open(BookingDetailsComponent, {
        width: "850px",
        data: response.data,
        disableClose: true,
      });
    });
  }

  tipDetails(id) {
    this._driverService.tipDetails(id).then((respnse: any) => {
      const dialogRef = this.dialog.open(TipHistoryComponent, {
        width: "850px",
        data: respnse.data,
        disableClose: true,
      });
    });
  }
  feedbackDetails(id) {
    this._driverService.feedbackDetails(id).then((response: any) => {
      const dialogRef = this.dialog.open(FeedbackComponent, {
        data: response.data,
        width: "850 px",
        disableClose: true,
      });
    });
  }
}

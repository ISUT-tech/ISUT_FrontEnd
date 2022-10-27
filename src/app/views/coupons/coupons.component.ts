import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConstantService } from "../../shared/services/constants.service";
import { UtilityService } from "../../shared/services/utility.service";
import { AddCouponComponent } from "./add-coupon/add-coupon.component";
import { CouponsService } from "./coupons.service";

@Component({
  selector: "app-coupons",
  templateUrl: "./coupons.component.html",
  styleUrls: ["./coupons.component.scss"],
})
export class CouponsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any;
  pagination: any;
  filter: any;
  pageNumber: any = 1;
  filterInput: string = null;

  constructor(
    public dialog: MatDialog,
    public _utilityService: UtilityService,
    private _couponsService: CouponsService,
    public _constantService: ConstantService
  ) {}

  ngOnInit() {
    this.pagination = this._utilityService.pagination;
    this.displayedColumns = this._couponsService.displayedColumns;
    this.getDataList();
  }
  getNextPageData(page: any) {
    this.pagination.currentPage = page.pageIndex + 1;
    this.pagination.perPage = page.pageSize;
    this.getDataList();
  }
  addCoupon() {
    const dialogRef = this.dialog.open(AddCouponComponent, {
      width: "40%",
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }
      this.getDataList();
    });
  }
  setStatus(id, event) {
    this._couponsService.setstatus(id, event.checked).then((response: any) => {
      this._utilityService.openMatSnackBar(response.message, response.status);
    });
  }

  // edit(id){
  //   this._couponsService.getCouponDetails(id)
  //   .then((Response:any)=> {
  //     const dialogRef = this.dialog.open(DetailsComponent, {
  //       width: '650px',
  //       data:Response.data,
  //       disableClose:true,
  //     })
  //   })
  //   ;
  // }
  // deleteById(id: any){
  //   if (confirm("Are you sure you want to delete this Cab?")) {
  //     this._couponsService.deleteById(id)
  //         .subscribe((response: any) => {
  //             if (response && response.status == 'OK') {
  //                 this.ngOnInit();
  //                 this._utilityService.openMatSnackBar(response.message, response.status);
  //             } else {
  //                 this._utilityService.openMatSnackBar(response.message, response.status);
  //             }
  //         }, error => {
  //             this._utilityService.openMatSnackBar("Internal Server error", 'ERROR');
  //         });
  // }
  // }
  getDataList() {
    let json = {
      pagination: this.pagination,
      filter: {
        keyword: this.filterInput,
      },
    };
    this._couponsService.getData(json).then((response: any) => {
      if (response && response.status === "OK") {
        this.pagination = response.data;
        this.dataSource = this.pagination.data;
        console.log(">>>>>>>", this.dataSource);
      }
    });
  }
}

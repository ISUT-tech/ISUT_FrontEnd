import { DetailsComponent } from "./../cabs/details/details.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";
import { UtilityService } from "../../shared/services/utility.service";
import { CabService } from "./cab.service";
import { ConstantService } from "../../shared/services/constants.service";

@Component({
  selector: "app-result",
  templateUrl: "./cabs.component.html",
  styleUrls: ["./cabs.component.css"],
})
export class CabsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any;
  pagination: any;
  filter: any;
  pageNumber: any = 1;
  filterInput: string = null;

  constructor(
    public dialog: MatDialog,
    public _utilityService: UtilityService,
    private _cabService: CabService,
    public _constantService: ConstantService
  ) {}

  ngOnInit() {
    this.pagination = this._utilityService.pagination;
    this.displayedColumns = this._cabService.displayedColumns;
    this.getDataList();
  }
  getNextPageData(page: any) {
    this.pagination.currentPage = page.pageIndex + 1;
    this.pagination.perPage = page.pageSize;
    this.getDataList();
  }

  view(id) {
    this._cabService.getCabDetails(id).then((Response: any) => {
      const dialogRef = this.dialog.open(DetailsComponent, {
        width: "650px",
        data: Response.data,
        disableClose: true,
      });
    });
  }
  // deleteById(id: any){
  //   if (confirm("Are you sure you want to delete this Cab?")) {
  //     this._cabService.deleteById(id)
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
    this._cabService.getData(json).then((response: any) => {
      if (response && response.status === "OK") {
        this.pagination = response.data;
        this.dataSource = this.pagination.data;
      }
    });
  }
}

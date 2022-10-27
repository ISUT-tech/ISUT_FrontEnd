import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DashboardService } from "../../../shared/services/dashboard.service";
import { UtilityService } from "../../../shared/services/utility.service";
import { CabDetailsComponent } from "../cab-details/cab-details.component";
import { DriverService } from "../driver.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  dataInfo: any;
  driverRating: any;
  displayedColumns: string[] = [
    "carName",
    "carNumber",
    "city",
    "state",
    "carModel",
    "licenseNumber",
    "registration",
    "Details",
  ];
  dataSource: any;
  average = 0;
  starArray: string = "";
  
  // starStr: any
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<DetailsComponent>,
    public _utilityService: UtilityService,
    private dialog: MatDialog,
    private _driverService: DriverService
  ) {
    this.dataInfo = _data["driverDetail"];
    this.driverRating = _data["driverRating"];
    let rating = 0;
    for (const iterator of this.driverRating) {
      rating = rating + iterator["rating"];
    }
    this.average = rating / this.driverRating.length;

    for(var i=0; i<this.average; i++){
      this.starArray+=" * ";
    }

    console.log(this.starArray);
  }

  ngOnInit() {}

  viewDetails(element): void {
    const dialogRef = this.dialog.open(CabDetailsComponent, {
      width: "900px",
      height: "530px",
      data: element
    });
  }

  acceptOrReject(id, status) {
    this._driverService.acceptOrReject(id, status).then((response: any) => {
      this.ngOnInit();
      this._utilityService.openMatSnackBar(response.message, response.status);
    });
  }
}

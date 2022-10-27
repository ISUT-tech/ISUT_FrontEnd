import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UtilityService } from "../../../shared/services/utility.service";
import { CabDetailsComponent } from "../cab-details/cab-details.component";

@Component({
  selector: "app-booking-details",
  templateUrl: "./booking-details.component.html",
  styleUrls: ["./booking-details.component.scss"],
})
export class BookingDetailsComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    "userMobileNumber",
    "sourceLocation",
    "destinationLocation",
    "fair",
    "userId",
    "createdAt",
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<CabDetailsComponent>,
    public _utilityService: UtilityService
  ) {
    this.dataSource = _data;
  }

  ngOnInit() {}
}

import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UtilityService } from "../../../shared/services/utility.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    "userMobileNumber",
    "sourceLocation",
    "destinationLocation",
    "fair",
    "driverId",
    "createdAt",
  ];
  dataSource1: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<DetailsComponent>,
    public _utilityService: UtilityService
  ) {
    this.dataSource = _data["userDetail"];
    this.dataSource1 = _data["bookingDetail"];
  }

  ngOnInit() {}
}

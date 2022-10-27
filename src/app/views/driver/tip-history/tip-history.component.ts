import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { UtilityService } from "../../../shared/services/utility.service";
import { DetailsComponent } from "../details/details.component";

@Component({
  selector: "app-tip-history",
  templateUrl: "./tip-history.component.html",
  styleUrls: ["./tip-history.component.scss"],
})
export class TipHistoryComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    "bookingId",
    "driverId",
    "userId",
    "tip",
    "createdAt",
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<DetailsComponent>,
    public _utilityService: UtilityService
  ) {
    this.dataSource = _data;
    }

  ngOnInit() {}
}

import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UtilityService } from "../../../shared/services/utility.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  dataInfo: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<DetailsComponent>,
    public _utilityService: UtilityService
  ) {
    this.dataInfo = _data;
  }

  ngOnInit() {}
}

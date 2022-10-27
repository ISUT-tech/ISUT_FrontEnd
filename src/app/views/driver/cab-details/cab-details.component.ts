import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UtilityService } from "../../../shared/services/utility.service";

@Component({
  selector: "app-cab-details",
  templateUrl: "./cab-details.component.html",
  styleUrls: ["./cab-details.component.scss"],
})
export class CabDetailsComponent implements OnInit {
  dataSource: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<CabDetailsComponent>,
    public _utilityService: UtilityService
  ) {
    this.dataSource = _data;
  }

  ngOnInit() {}
}

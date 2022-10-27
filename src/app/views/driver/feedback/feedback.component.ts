import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { Component, Inject, inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UtilityService } from "../../../shared/services/utility.service";
import { DetailsComponent } from "../details/details.component";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"],
})
export class FeedbackComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    "bookingId",
    "driverId",
    "userId",
    "feedback",
    "createdAt",
    "action"
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<DetailsComponent>,
    public _utilityService: UtilityService,
    public dialog: MatDialog,

  ) {
    this.dataSource = _data;
    }

  ngOnInit() {}

  view(): void {
    const dialogRef = this.dialog.open(AddFeedbackComponent, {
      width: "40%",
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }
    });
  }
}

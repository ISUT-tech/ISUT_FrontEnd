import { FeedbackComponent } from './../feedback.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<FeedbackComponent>,

  ) { }

  ngOnInit() {
  }

}

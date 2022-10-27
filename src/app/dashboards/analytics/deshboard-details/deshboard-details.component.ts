import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deshboard-details',
  templateUrl: './deshboard-details.component.html',
  styleUrls: ['./deshboard-details.component.scss']
})
export class DeshboardDetailsComponent implements OnInit {
dataSource:any
  constructor(

    @Inject(MAT_DIALOG_DATA) private _data: any,
    public matDialogRef: MatDialogRef<DeshboardDetailsComponent>
  ) { 

    this.dataSource=_data

  }

  ngOnInit() {
  }

}

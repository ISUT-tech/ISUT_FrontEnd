import { DeshboardDetailsComponent } from './deshboard-details/deshboard-details.component';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';
import { UserService } from '../../shared/services/user.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['driverId', 'userMobileNumber', 'sourceLocation', 'destinationLocation','action'];
  dashboardData: any;
  data: any;
  dataSource: any;

  
  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _dashboardService: DashboardService
  ) {
    // this.getData();
    // this.changeTab(this.activeTab);
  }



  ngOnInit(): void {
    this._dashboardService.booking().then((resData:any)=>{
      this.dataSource = resData.data;
    })

    }
    details(element){
      const dialogRef = this.dialog.open(DeshboardDetailsComponent, {
        width: '650px',
        data:element
      });
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

 
  


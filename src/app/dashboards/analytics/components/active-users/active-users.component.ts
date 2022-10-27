import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { timer } from 'rxjs';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'portal-dashboard-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {

  @Input("data") data;

  @ViewChild(BaseChartDirective) chartElement: BaseChartDirective;
  activeUsers: BehaviorSubject<number> = new BehaviorSubject(0);
  numberOfBars: number = 15;
  barChartOptions: any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true,
    tooltips: {
      enabled: true,
      backgroundColor: '#ffffff',
      titleFontColor: '#00ABEE',
      bodyFontColor: 'rgba(0, 171, 238, 0.6)',
      xPadding: 20,
      yPadding: 20,
      displayColors: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  barChartLabels: string[] = [];
  barChartDatasets: any[] = [
    {
      data: [],
      label: 'Results'
    }
  ];
  barChartColors: any[] = [{
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }];
  dashboardData: any;

  constructor(

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.data;
    this.dashboardData = currentItem.currentValue;
    console.log('prev value: ', currentItem);
    let count = 0;
    for (let i = 0; i < this.dashboardData.perDayResults.length; i++) {
      this.barChartLabels[i] = this.dashboardData.perDayResults[i].key;
      this.barChartDatasets[0].data[i] = this.dashboardData.perDayResults[i].value;
      count += this.dashboardData.perDayResults[i].value;
    }
    this.activeUsers.next(count);
  }
}
